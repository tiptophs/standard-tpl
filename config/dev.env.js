/*
 * @Descripttion: webpack dev 环境的配置
 * @version:1.0
 * @Author: tiptop
 * @Date: 2020-07-15 22:46:15
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-15 23:08:57
 */

// 配置合并依赖(新版本变成webpack-merge内部的smart)
const { smart } = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = smart(prodEnv, {
  NODE_ENV: '"development"',
});
