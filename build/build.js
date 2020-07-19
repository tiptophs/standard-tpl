/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-18 09:32:06
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 11:48:31
 */

require("./utils/check-versions")();

process.env.NODE_ENV = "production";

const ora = require("ora"); // ora包用于显示加载中的效果，类似于前端页面的loading效果。
const rm = require("rimraf"); // rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("./config");
const webpackConfig = require("./webpack.prod.conf");

const spinner = ora("building for production...");
spinner.start();

// 删除static目录
rm(
  path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
  (err) => {
    if (err) throw err;
    webpack(webpackConfig, (err, stats) => {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(
        `${stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false,
        })}\n\n`
      );

      if (stats.hasErrors()) {
        console.log(chalk.red("  Build failed with errors.\n"));
        process.exit(1);
      }

      console.log(chalk.cyan("  Build complete.\n"));
      console.log(
        chalk.yellow(
          "  Tip: built files are meant to be served over an HTTP server.\n" +
            "  Opening index.html over file:// won't work.\n"
        )
      );
    });
  }
);
