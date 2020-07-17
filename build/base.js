// webpack 基础配置数据 (webpack是node开发的，所以这里要用node语法)

// 引入node中path路径函数，他可以将相对路径转化为绝对路径
const path = require("path");
// 引入HtmlWebpackPlugin插件，他会根据指定的html模板生成一个内存中的模板
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入css处理插件，将html模板内的style样式替换成link的形式
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入css优化插件，让打包的css文件压缩
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 引入uglify, 让js文件压缩
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 引入webpack, 这样可以采用webpack的内部插件
const webpack = require("webpack");

// 引入开发常用插件copy,clean,banner(内置)
// clean 运行的时候会先删除指定的目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 该插件不能和watch一起使用
// 将资源copy到指定的目录，一般用于处理静态资源
const CopyPlugin = require("copy-webpack-plugin");
// 引入vue-laoder处理vue组件
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// webpack 配置
module.exports = {
  // 开发模式(production生产模式， development开发模式)
  mode: "development",
  // 开发服务器的配置
  devServer: {
    port: 3000, // 端口
    progress: true, // 打包显示进度条
    contentBase: "./dist", // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
    open: true, // 运行服务后自动在浏览器内打开
    compress: true, // Gzip压缩、
    publicPath: "/", // 打包虚拟资源路径
    // proxy:{         //添加代理转发
    //    '/api':{
    //        target: 'http://localhost:3000',  //将/api代理到3000端口
    //        pathRewrite: {'/api': ''}         //将api替换为空
    //    }
    // },
    // before(app){    //mock数据的方式, 内部自带一个express
    //     app.get('/user', (req, res)=>{
    //         res.json({
    //             name: '接口测试'
    //         })
    //     })
    // }
  },
  // noParse: '/jquery/',   //webpack打包的时候不去解析jquery,这里采用的是正则匹配（优化项，还是会走webpack但不会再次编译）
  resolve: {
    // 解析，第三方common
    modules: [path.resolve("node_modules")], // 指定解析的模块
    // alias:{ //别名, 采用这种方式后就不用输出后面的路径直接import前面的bootstrap即可
    //     'bootstrap':'bootstrap/dist/css/bootstrap.css'
    // },
    // 扩展名称, import的文件不用输出后缀, 默认顺寻从左到右
    extensions: [".js", ".css", ".vue"],
    // mainFileds:['style', 'main'],  //默认查找优先级别(package.json文件)
    // mainFiles:[]    //入口文件名称index.js
  },
  // 增加映射文件
  // source-map 增加映射文件，大全
  // eval-source-map 不会生成文件，但可以显示行和列，集成在生成的js内部
  // cheap-module-source-map不会产生列，但是是一个单独的映射文件,保留下来调试
  // cheap-module-eval-source-map 不会产生列，不会生成文件，集成在js内部
  devtool: "eval-source-map", // 增加映射文件可以帮助我们调整代码
  // watch监控，可以生成文件,build后会检测文件，也可以设置npm run watch
  // watch:true,
  // 每秒1000次，防抖500
  // watchOptions:{poll:1000, aggrgateTimeout:500， ignored:/node_modules/ }
  // 入口地址, 多入口模式
  /**
   * entry:{
   *  name:[a, b]
   *  name:a
   * }
   */
  entry: ["./src/main.js"],
  // 输出地址
  output: {
    filename: "js/bundle.[hash:8].js", // 打包后的文件名称,[hash:8]生成版本hash，8设置长度  多文件打包[name].js
    path: path.resolve(__dirname, "./dist"), // 输出路径必须是一个绝对路径
    publicPath: "/",
  },
  // webpack4.0 新增优化项目, 这里的优化项在production环境下才生效
  optimization: {
    // minimizer:[
    //     new OptimizeCssAssetsPlugin({}),
    //     new UglifyJsPlugin({
    //         parallel: true,     //并发打包
    //         sourceMap: true,    //源码映射
    //         cache:true          //启用缓存
    //     }),
    // ]
  },
  // 不需要打包的模块
  externals: {
    jquery: "jQuery", // 采用cdn等方式引入。
  },
  // 模块，用于处理相应文件的loader
  module: {
    rules: [
      // 规则
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',   //这里也可以采用对象的形式，可以传递额外的参数
          "css-loader",
          "postcss-loader", // 自动添加前缀
        ],
      },
      // css-loader 解析@import这种语法(css内部应用css文件)
      // style-loader 把css插入到head标签中
      // loader特定希望单一化
      // loader的顺序为从下到上执行
      {
        // 这里可以有 less less-loader node-sass sass-loader stylus stylus-loader
        test: /\.less$/,
        use: [
          //   {
          //     loader:'style-loader',
          //     options:{
          //         insert:'top'    //将样式插在最顶部位置，优先级最低
          //     }
          //   },
          MiniCssExtractPlugin.loader,
          // 'style-loader',   //这里也可以采用对象的形式，可以传递额外的参数
          "css-loader",
          "postcss-loader", // 自动添加前缀
          "less-loader",
        ], // 这里可以是字符串也可以是数组，多个loader采用数组的方式，处理方式为从右向左执行
      },
      // 处理js文件
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            // 用babel-loader把es6->es5,也可以写入到外部文件babel.config.js
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        include: path.resolve(__dirname, "src"), // 包含文件
        exclude: /node_modules/, // 排除目录
      },
      // 验证js文件
      // {
      //     test:/\.js$/,
      //     use:{
      //         loader:'eslint-loader',
      //         options:{
      //             enforce: 'pre' //previous前， post后
      //         }
      //     }
      // },
      // 处理图片,file-loader, 需要base-64的化采用url-loader
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 200 * 1024,
            outputPath: "img/",
            esModule: false,
            // publicPath:''    //单独添加地址前缀
          },
        },
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader",
      },
      // 处理vue文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  // 数组，用于存放所有的webpack插件，插件是一个类所以要大写，并且要new
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 指定依赖的模板文件
      filename: "index.html", // 生成的文件名称
      minify: {
        // html的处理
        removeAttributeQuotes: true, // 删除多余的双引号
        collapseWhitespace: true, // html压缩成一行
      },
      hash: true, // hash
      // chunks:[]                          //多文件打包，内部填写name名称
      // excludeChunks:[]                        //忽略的模块
    }),
    // css生成link的形式引入
    new MiniCssExtractPlugin({
      filename: "css/bundle.[hash:8].css",
    }),
    // webpack提供插件
    // new webpack.ProvidePlugin({
    //     $ : 'jquery'
    // }),
    // clean
    // new CleanWebpackPlugin(),
    // copy
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "./assets",
        },
      ],
    }),
    // banner
    new webpack.BannerPlugin("this is a esay test"),
    // vue-plugin
    new VueLoaderPlugin(),
    // webpack自带的环境变量插件
    // new webpack.DefinePlugin({
    //     DEV: JSON.stringify('dev'),
    //     FLAG: 'true',
    //     EXPRESSION: '1+1'
    // })
  ],
};
