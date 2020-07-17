/**
 * creator: tiptop
 * time:2020/7/15
 * description: webpack基础配置文件
 * version:1.0
 */

// 引入nodejs内部路径组件
const path = require("path");
// 引入配置文件
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
      // ...(config.dev.useEslint ? [createLintingRule()] : []),
    ],
  },
};
