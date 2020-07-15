/*
 * @Descripttion: webpack 测试环境配置
 * @version:1.0
 * @Author: tiptop
 * @Date: 2020-07-15 22:47:01
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-15 23:11:19
 */

const { smart } = require("webpack-merge");
const devEnv = require("./dev.env");

module.exports = smart(devEnv, {
  NODE_ENV: '"testing"',
});
