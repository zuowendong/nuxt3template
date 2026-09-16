#!/usr/bin/env node

/**
 * pre-push hook: 检查待推送的 commit 是否符合 Conventional Commits 规范
 * 由 simple-git-hooks / husky 在 pre-push 阶段自动调用
 * 用法: node check-commits.js
 *
 * 环境变量:
 *   SKIP_COMMIT_CHECK=1  跳过检查
 */

const { execSync } = require("child_process");

if (process.env.SKIP_COMMIT_CHECK === "1") {
  process.exit(0);
}

// Conventional Commits 正则
const PATTERN =
  /^(feat|fix|refactor|style|chore|docs|perf|test|ci|build|revert)(\(.+\))?: .+/;

// 获取待推送的 commit 列表
let range = "";
try {
  const branch = execSync("git rev-parse --abbrev-ref HEAD", {
    encoding: "utf8",
  }).trim();
  const upstream = execSync(`git rev-parse --abbrev-ref ${branch}@{upstream}`, {
    encoding: "utf8",
    stdio: "pipe",
  }).trim();
  range = `${upstream}..${branch}`;
} catch {
  // 无上游分支，检查最近 10 条
  range = "HEAD~10..HEAD";
}

let commits = [];
try {
  // --no-merges: 平台自动生成的 merge commit（如 [MergeToProd]/效能平台发布）
  // 已存在于远程历史且不可改写，不在人工提交规范检查范围内
  const output = execSync(`git rev-list --no-merges ${range}`, {
    encoding: "utf8",
  });
  commits = output.trim().split("\n").filter(Boolean);
} catch {
  process.exit(0);
}

if (commits.length === 0) {
  process.exit(0);
}

console.log(`[Commit Check] 检查 ${commits.length} 个待推送的 commit...`);

let hasError = false;

for (const commit of commits) {
  const msg = execSync(`git log -1 --format=%s ${commit}`, {
    encoding: "utf8",
  }).trim();
  if (PATTERN.test(msg)) {
    console.log(`[OK] ${commit.substring(0, 8)}: ${msg}`);
  } else {
    console.log(`[FAIL] ${commit.substring(0, 8)}: ${msg}`);
    hasError = true;
  }
}

if (hasError) {
  console.log("");
  console.log("[Commit Check] 存在不符合规范的 commit，push 已拦截！");
  console.log("格式: <type>(<scope>): <subject>");
  console.log(
    "type: feat|fix|refactor|style|chore|docs|perf|test|ci|build|revert",
  );
  console.log("");
  console.log("修复方式:");
  console.log('  最近一条: git commit --amend -m "feat(scope): 描述"');
  console.log("  多条历史: git rebase -i HEAD~N，将 pick 改为 reword 逐条修改");
  process.exit(1);
}

console.log("[Commit Check] 所有 commit 符合规范");
process.exit(0);
