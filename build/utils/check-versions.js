/*
 * @Descripttion: 检查nodejs的版本是否正确
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-18 09:32:20
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 11:49:01
 */

const chalk = require("chalk"); // 终端字符串美化
const semver = require("semver"); // semver 是 语义化版本（Semantic Versioning）规范 的一个实现，目前是由 npm 的团队维护，实现了版本和版本范围的解析、计算、比较
const shell = require("shelljs"); // Shelljs是Node.js下的脚本语言解析器，具有丰富且强大的底层操作(Windows/Linux/OS X)权限。Shelljs本质就是基于node的一层命令封装插件，让前端开发者可以不依赖linux也不依赖类似于cmder的转换工具，而是直接在我们最熟悉不过的javascript代码中编写shell命令实现功能。
const packageConfig = require("../../package.json");

// 子进程，同步进程
function exec(cmd) {
  return require("child_process").execSync(cmd).toString().trim();
}

// 比较nodejs的版本
const versionRequirements = [
  {
    name: "node",
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
];

if (shell.which("npm")) {
  versionRequirements.push({
    name: "npm",
    currentVersion: exec("npm --version"),
    versionRequirement: packageConfig.engines.npm,
  });
}

module.exports = function () {
  const warnings = [];

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i];

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        `${mod.name}: ${chalk.red(mod.currentVersion)} should be ${chalk.green(
          mod.versionRequirement
        )}`
      );
    }
  }

  if (warnings.length) {
    console.log("");
    console.log(
      chalk.yellow(
        "To use this template, you must update following to modules:"
      )
    );
    console.log();

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i];
      console.log(`  ${warning}`);
    }

    console.log();
    // 非正常提示信息
    process.exit(1);
  }
};
