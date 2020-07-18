/*
 * @Descripttion: webpack dev 环境的配置
 * @version:1.0
 * @Author: tiptop
 * @Date: 2020-07-15 22:46:15
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-17 17:23:51
 */

// 配置合并依赖(新版本变成webpack-merge内部的smart)
const { merge } = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
});
