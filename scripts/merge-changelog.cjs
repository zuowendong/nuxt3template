#!/usr/bin/env node

/**
 * git merge driver: CHANGELOG.md 冲突自动合并（按日期归纳排序）
 * 配置（init/update 自动写入，手动补配亦可）:
 *   .gitattributes:            CHANGELOG.md merge=changelog
 *   git config merge.changelog.name   "CHANGELOG date-grouped union merge"
 *   git config merge.changelog.driver "node scripts/merge-changelog.cjs %O %A %B"
 *
 * 用法（由 git 调用）: node merge-changelog.cjs <base> <ours> <theirs>   即 %O %A %B
 * 合并结果写回 <ours>（%A），exit 0 成功；无法无损解析时 exit 1，
 * git 退回普通冲突流程由人工解决。
 *
 * 合并策略:
 *   - 条目取 ours ∪ theirs 并集（CHANGELOG 只追加不修改，base 不参与决策）
 *   - 同一日期下 ours 条目在前，theirs 新增条目追加在后
 *   - 日期块降序排列（新日期在上），整行完全相同的条目去重
 *   - 安全网: ours/theirs 任一方"解析→渲染"无法无损还原（含非标准格式内容）
 *     则 exit 1 退回人工处理，绝不静默丢失内容
 */

const fs = require("fs");

const [, , baseFile, oursFile, theirsFile] = process.argv;

if (!baseFile || !oursFile || !theirsFile) {
  process.exit(1);
}

function read(file) {
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    process.exit(1);
  }
}

/** 解析为 Map<日期, 条目数组>（保持出现顺序，块内整行去重） */
function parseChangelog(content) {
  const entries = new Map();
  let currentDate = null;
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    const header = line.match(/^##\s+(\d{4}-\d{2}-\d{2})\s*$/);
    if (header) {
      currentDate = header[1];
      if (!entries.has(currentDate)) entries.set(currentDate, []);
      continue;
    }
    if (currentDate && line.startsWith("- ")) {
      const list = entries.get(currentDate);
      if (!list.includes(line)) list.push(line);
    }
    // 其余行（表头/空行/非标准内容）不进结构，由无损校验把关
  }
  return entries;
}

/** 按标准格式渲染：日期降序、块间单空行 */
function renderChangelog(entries) {
  let out = "# Change Log\n";
  const dates = [...entries.keys()].sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
  for (const date of dates) {
    const list = entries.get(date);
    if (!list.length) continue;
    out += `\n## ${date}\n\n${list.join("\n")}\n`;
  }
  return out;
}

/** 规范化（CRLF→LF、行尾去空、压缩连续空行、末尾单换行）后比较 */
function normalize(text) {
  const lines = text
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((l) => l.trimEnd());
  const compact = [];
  for (const l of lines) {
    if (l === "" && compact[compact.length - 1] === "") continue;
    compact.push(l);
  }
  const out = compact.join("\n").replace(/\n+$/, "");
  return out === "" ? "" : out + "\n";
}

/** parse → render 无损还原校验，拦截非标准内容被静默丢弃 */
function isLossless(content) {
  return normalize(renderChangelog(parseChangelog(content))) === normalize(content);
}

const ours = read(oursFile);
const theirs = read(theirsFile);

if (!isLossless(ours) || !isLossless(theirs)) {
  process.exit(1);
}

const merged = new Map(parseChangelog(ours));
for (const [date, list] of parseChangelog(theirs)) {
  if (!merged.has(date)) {
    merged.set(date, [...list]);
    continue;
  }
  const target = merged.get(date);
  for (const item of list) {
    if (!target.includes(item)) target.push(item);
  }
}
for (const [date, list] of merged) {
  if (!list.length) merged.delete(date);
}

fs.writeFileSync(oursFile, renderChangelog(merged), "utf8");
process.exit(0);
