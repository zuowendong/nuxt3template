#!/usr/bin/env node

/**
 * post-commit hook: 把 prepare-commit-msg 阶段写入的 CHANGELOG.md 并入刚创建的提交
 *
 * 背景：git commit 的 tree 快照在 prepare-commit-msg 之前已固化，
 *       hook 阶段 git add 无法进本次提交，故由 post-commit 补入。
 *
 * 防循环：amend 后 index 与 HEAD 一致 → 无差异 → 直接退出（amend 会再次触发本钩子）
 * 安全：暂存区若混有其他文件则放弃 amend，避免把无关改动卷进上一个提交
 *
 * 环境变量:
 *   WRITE_CHANGELOG=1  启用 CHANGELOG 并入（默认关闭；未启用时本钩子直接退出，不碰 CHANGELOG.md）
 */

const { execSync } = require("child_process");
const fs = require("fs");

try {
  // 默认不启用 CHANGELOG：直接退出（changelog 模式 / 显式 opt-in 时才需要并入）
  if (process.env.WRITE_CHANGELOG !== "1") {
    process.exit(0);
  }

  if (!fs.existsSync("CHANGELOG.md")) {
    process.exit(0);
  }

  execSync("git add CHANGELOG.md", { stdio: "pipe" });

  // 对比暂存区与 HEAD：无差异说明 CHANGELOG 已在提交里（或二次进入），退出
  const staged = execSync("git diff --cached --name-only HEAD", {
    encoding: "utf8",
  }).trim();

  if (!staged) {
    process.exit(0);
  }

  const files = staged
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (files.length === 1 && files[0] === "CHANGELOG.md") {
    execSync("git commit --amend --no-edit", { stdio: "pipe" });
    console.log("[AI Commit] CHANGELOG 已并入本次提交");
  } else {
    console.log(
      "[AI Commit] CHANGELOG 已暂存，将随下次提交入库（暂存区有其他文件，跳过 amend）",
    );
  }
} catch {}

process.exit(0);
