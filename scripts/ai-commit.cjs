#!/usr/bin/env node

/**
 * prepare-commit-msg hook: 调用 qodercli AI 生成 commit message（默认不写 CHANGELOG）
 * 由 simple-git-hooks / husky 在 prepare-commit-msg 阶段自动调用
 * 用法: node ai-commit.cjs <commit-msg-file> <commit-source>
 *
 * 环境变量:
 *   SKIP_AI_COMMIT=1    跳过整个钩子（skill 已生成 message 时使用）
 *   WRITE_CHANGELOG=1   启用 CHANGELOG 写入（默认关闭；仅 changelog 模式 / 显式 opt-in 时设置）
 */

const { execSync, execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const commitMsgFile = process.argv[2];
const commitSource = process.argv[3];

if (!commitMsgFile) {
  process.exit(0);
}

// 跳过 merge、amend、squash、template 等场景
if (commitSource && !["message", ""].includes(commitSource)) {
  process.exit(0);
}

// skill 已生成 message 时跳过
if (process.env.SKIP_AI_COMMIT === "1") {
  process.exit(0);
}

// 检测 qodercli
try {
  execSync("qodercli --version", { encoding: "utf8", stdio: "pipe" });
} catch {
  console.log(
    "[AI Commit] qodercli 未安装，请先安装 Qoder CLI 并执行 qodercli login",
  );
  process.exit(0);
}

// 获取暂存区 diff
let diff = "";
try {
  diff = execSync("git diff --cached --unified=0", { encoding: "utf8" });
} catch {
  process.exit(0);
}

if (!diff.trim()) {
  process.exit(0);
}

// 截断超长 diff
const MAX_DIFF = 8000;
if (diff.length > MAX_DIFF) {
  diff = diff.substring(0, MAX_DIFF) + "\n... (diff truncated)";
}

// 构建 prompt（明确禁止执行命令，避免 qodercli agent 自行调用 git 被沙箱拦截挂起）
const prompt = `直接根据下面文本生成 Conventional Commits 提交信息。禁止执行任何命令，禁止调用任何工具，只输出提交信息本身。

格式规则：
- 格式：<type>(<scope>): <subject>
- type 可选：feat, fix, refactor, style, chore, docs, perf, test, ci, build, revert
- scope 从文件路径识别受影响模块，跨模块时省略
- subject 中文概括核心内容，不超过 50 字，不加句号
- 单一改动点只写 subject，不加 body
- 多个改动点用 body 逐条列出，每条以 - 开头，说"改了什么"不说"怎么改的"
- 只输出 commit 信息本身，不要任何额外解释，不要用代码块包裹

<变更内容>
${diff}
</变更内容>`;

// 调用 qodercli 非交互模式生成（execFileSync 数组传参，免 shell 转义，Windows/macOS/Linux 通用）
try {
  console.log("[AI Commit] 正在生成提交信息...");
  let commitMsg = callQodercli(prompt).trim();

  // 去除可能存在的 markdown 代码块包裹
  commitMsg = commitMsg
    .replace(/^```[a-z]*\n?/, "")
    .replace(/\n?```$/, "")
    .trim();

  if (commitMsg) {
    fs.writeFileSync(commitMsgFile, commitMsg, "utf8");
    console.log("[AI Commit] 已生成，请查看编辑器内容确认或微调");

    // 写 CHANGELOG（仅在显式 opt-in 时；规则见 CHANGELOG_RULE.md）
    if (process.env.WRITE_CHANGELOG === "1") {
      try {
        writeChangelog(commitMsg);
      } catch (e) {
        console.log("[AI Commit] CHANGELOG 写入失败，不影响提交");
      }
    }
  }
} catch (error) {
  console.log("[AI Commit] 生成失败，请手动填写");
}

process.exit(0);

/**
 * 调用 qodercli -p，跨平台兼容
 * Windows 下若 qodercli 是 .cmd 包装器（npm 安装形态），execFileSync 无法直接 spawn，回退 .cmd
 */
function callQodercli(prompt) {
  const opts = {
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
    timeout: 60000,
  };
  try {
    return execFileSync(
      "qodercli",
      ["-p", prompt, "--no-session-persistence"],
      opts,
    );
  } catch (e) {
    if (e.code === "ENOENT" && process.platform === "win32") {
      return execFileSync(
        "qodercli.cmd",
        ["-p", prompt, "--no-session-persistence"],
        opts,
      );
    }
    throw e;
  }
}

/**
 * 写 CHANGELOG.md
 * - 日期分组 YYYY-MM-DD
 * - 同日追加
 * - 每条末尾标注作者
 */
function writeChangelog(commitMsg) {
  const changelogPath = path.join(process.cwd(), "CHANGELOG.md");

  // 获取本地日期（不用 toISOString，那是 UTC 日期，东八区晚 8 点后会偏到第二天）和作者
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
    now.getDate(),
  ).padStart(2, "0")}`;
  let author = "unknown";
  try {
    author = execSync("git config user.name", { encoding: "utf8" }).trim();
  } catch {}

  // 取 subject（去掉 type(scope): 前缀），每次提交只写一条简略记录
  const lines = commitMsg
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const subject = lines[0].replace(/^\w+(\(.*?\))?:\s*/, "");
  const entries = [`- ${subject} (${author})`];
  const entry = entries[0];

  // 读取或创建 CHANGELOG.md
  let content = "# Change Log\n";
  if (fs.existsSync(changelogPath)) {
    content = fs.readFileSync(changelogPath, "utf8");
  }

  const dateHeader = `## ${today}`;

  if (content.includes(dateHeader)) {
    // 防重复：当天已有相同条目则跳过（commit 校验失败后重试会再走一次本钩子）
    const headerIdx = content.indexOf(dateHeader);
    const nextHeader = content.indexOf("\n## ", headerIdx + dateHeader.length);
    const sectionEnd = nextHeader === -1 ? content.length : nextHeader;
    if (content.slice(headerIdx, sectionEnd).includes(entry)) {
      return;
    }
    // 同日追加
    const idx = content.indexOf(dateHeader);
    const lineEnd = content.indexOf("\n", idx);
    const insertPos = lineEnd + 1;
    content =
      content.slice(0, insertPos) +
      entries.join("\n") +
      "\n" +
      content.slice(insertPos);
  } else {
    // 新日期插在表头后
    const headerEnd = content.indexOf("\n") + 1;
    content =
      content.slice(0, headerEnd) +
      `\n${dateHeader}\n\n` +
      entries.join("\n") +
      "\n" +
      content.slice(headerEnd);
  }

  fs.writeFileSync(changelogPath, content, "utf8");

  // 注意：不在此处 git add —— commit 的 tree 快照在本钩子之前已固化，
  // add 也进不了本次提交，由 post-commit 钩子通过 --amend --no-edit 补入
}
