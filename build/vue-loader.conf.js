/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-18 09:32:44
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-18 23:11:29
 */

const utils = require("./utils");
const config = require("./config");

const isProduction = process.env.NODE_ENV === "production";
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction,
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href",
  },
};
