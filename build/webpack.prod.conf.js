/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-14 00:02:09
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 15:14:14
 */
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const baseWebpackConfig = require("./webpack.base.conf");
const config = require("./config");
const utils = require("./utils");

const webpackConfig = merge(baseWebpackConfig, {
  // 开发模式(production生产模式， development开发模式)
  mode: "production",
  // 模块
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true,
    }),
  },

  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js"),
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // new webpack.DefinePlugin({
    //   "process.env": require("./config/prod.env"),
    // }),
    // css生成link的形式引入
    // new MiniCssExtractPlugin({
    //   filename: "css/bundle.[hash:7].css",
    // }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin({
    //   cssProcessorOptions: config.build.productionSourceMap
    //     ? { safe: true, map: { inline: false } }
    //     : { safe: true },
    // }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: "public/index.html",
      inject: true,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // removeAttributeQuotes: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: "dependency",
    }),
    // keep module.id stable when vendor modules does not change
    // new webpack.HashedModuleIdsPlugin(),
  ],
});

// if (config.build.productionGzip) {
//   const CompressionWebpackPlugin = require("compression-webpack-plugin");

//   webpackConfig.plugins.push(
//     new CompressionWebpackPlugin({
//       asset: "[path].gz[query]",
//       algorithm: "gzip",
//       test: new RegExp(
//         `\\.(${config.build.productionGzipExtensions.join("|")})$`
//       ),
//       threshold: 10240,
//       minRatio: 0.8,
//     })
//   );
// }

// 代码分析模块
// if (config.build.bundleAnalyzerReport) {
//   const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
//   webpackConfig.plugins.push(new BundleAnalyzerPlugin());
// }
module.exports = webpackConfig;
