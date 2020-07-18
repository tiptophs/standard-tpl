/**
 * 运行环境的开发
 */
const webpack = require("webpack"); // 引入webpack
const { merge } = require("webpack-merge"); // 配置合并依赖
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 该组件可以更具依赖的html模板，生成一个内存中的html模板
const portfinder = require("portfinder"); // 端口查找
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin"); // webpack错误友好插件
const CopyWebpackPlugin = require("copy-webpack-plugin"); // copy插件
const baseWebpackConfig = require("./webpack.base.conf"); // 基础文件配置
// 引入配置文件
const config = require("./config");
// 引入工具类
const utils = require("./utils");

// 获取host和端口，这样写命令行上的优先级最高，其次是配置文件
const { HOST } = process.env;
const PORT = process.env.PORT && Number(process.env.PORT);

const devWebpackConfig = merge(baseWebpackConfig, {
  // 模块
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
    }),
  },
  // cheap-module-eval-source-map 模式在开发模式最快
  devtool: config.dev.devtool,
  // 开启一个服务配置信息位于/config/index.js
  devServer: {
    clientLogLevel: "warning",
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, "index.html"),
        },
      ],
    },
    hot: true, // 启用 webpack 的模块热替换特性：
    contentBase: false, // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    compress: true, // Gzip压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    overlay: config.dev.errorOverlay // 运行错误的全屏警告
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath, // 内存的打包地址
    proxy: config.dev.proxyTable, // 代理
    quiet: true, // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  // 插件
  plugins: [
    // webpack 内置变量模板
    new webpack.DefinePlugin({
      "process.env": require("./config/dev.env"), // 重置process.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
    new webpack.NoEmitOnErrorsPlugin(), // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
    // html内存模板插件
    new HtmlWebpackPlugin({
      template: "public/index.html", // 指定依赖的模板文件
      filename: "index.html", // 生成的文件名称
      minify: {
        removeAttributeQuotes: true, // 删除多余的双引号
        collapseWhitespace: false, // html压缩成一行
      },
      hash: true, // hash,每次打包后都会发生变化，不根据内容自动生成
      inject: true, // script文件的插入位置
      // chunks:[]                          //多文件打包，内部填写name名称
      // excludeChunks:[]                   //忽略的模块
    }),
    // copy 静态资源插件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../static"),
          to: config.dev.assetsSubDirectory,
        },
      ],
    }),
  ],
});

// 运行开发环境前，先去释放接口
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // 重置process.env内部的port
      process.env.PORT = port;
      // 将端口配置到的devServer
      devWebpackConfig.devServer.port = port;

      // Friendly-errors-webpack-plugin识别某些类别的webpack错误，并清理，聚合和优先级，以提供更好的开发人员体验。
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            // 编译成功之后，输出新端口
            messages: [
              `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`,
            ],
          },
          onErrors: config.dev.notifyOnErrors
            ? utils.createNotifierCallback()
            : undefined,
        })
      );
      // 返回数据
      resolve(devWebpackConfig);
    }
  });
});
