/** commitlint 配置 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "style",
        "chore",
        "docs",
        "perf",
        "test",
        "ci",
        "build",
        "revert",
      ],
    ],
    "subject-case": [0], // 禁用大小写检查（中文 subject）
    "header-max-length": [2, "always", 100],
  },
};
