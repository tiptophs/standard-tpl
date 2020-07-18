/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-14 00:02:09
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-18 10:55:57
 */
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("../config");
const utils = require("./utils");

const webpackConfig = merge(baseWebpackConfig, {
  // 模块
  module: {
    // rules: utils.styleLoaders({
    //   sourceMap: config.build.productionSourceMap,
    //   extract: true,
    //   usePostCSS: true,
    // }),
  },

  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": require("../config/prod.env"),
    }),
  ],
});

// 代码分析模块
if (config.build.bundleAnalyzerReport) {
  const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
  webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
module.exports = webpackConfig;
