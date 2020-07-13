const path = require("path");

module.exports = {
  // 环境
  mode: "development",
  // 入口
  entry: "./src/main.js",
  // 输出
  output: {
    filename: "js/bundle.[hash:8].js", // 打包后的文件名称,[hash:8]生成版本hash，8设置长度  多文件打包[name].js
    path: path.resolve(__dirname, "./dist"), // 输出路径必须是一个绝对路径
    publicPath: "/",
  },
};
