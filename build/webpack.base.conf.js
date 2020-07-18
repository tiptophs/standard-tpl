/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-14 00:01:59
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-18 21:56:25
 */
const path = require("path");
const utils = require("./utils");
const config = require("../config");

// +--------------内部公用配置和函数----------------------
// 定义文件引入的方法
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}
// 定义eslint的配置
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: "eslint-loader",
  enforce: "pre",
  include: [resolve("src"), resolve("test")],
  options: {
    formatter: require("eslint-friendly-formatter"),
    emitWarning: !config.dev.showEslintErrorsInOverlay,
  },
});

// +--------------webpack配置部分-------------------------
module.exports = {
  // 基础目录
  context: path.resolve(__dirname, "../"),
  // 入口
  entry: {
    app: "./src/main.js",
  },
  // 出口
  output: {
    path: config.build.assetsRoot,
    filename: "[name].js",
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath,
  },
  // 配置 Webpack 如何寻找模块所对应的文件
  resolve: {
    // 扩展名称, import的文件不用输出后缀, 默认顺寻从左到右
    extensions: [".js", ".vue", ".json"],
    alias: {
      // 别名, 采用这种方式后就不用输出后面的路径直接import前面的key即可
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
    },
  },
  // webpack,规则配置模块
  module: {
    rules: [
      // 确认是否开启eslint
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: utils.assetsPath("img/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: utils.assetsPath("media/[name].[hash:7].[ext]"),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          name: utils.assetsPath("fonts/[name].[hash:7].[ext]"),
        },
      },
    ],
  },
  // 不知道这是什么意思
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: "empty",
    fs: "empty",
    net: "empty",
    tls: "empty",
    child_process: "empty",
  },
};
