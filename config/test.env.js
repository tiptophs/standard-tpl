/*
 * @Descripttion: webpack 测试环境配置
 * @version:1.0
 * @Author: tiptop
 * @Date: 2020-07-15 22:47:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-17 17:24:11
 */

const { merge } = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
});
