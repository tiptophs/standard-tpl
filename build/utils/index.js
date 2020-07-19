/*
 * @Descripttion:
 * @version:
 * @Author: tiptop
 * @Date: 2020-07-17 22:04:00
 * @LastEditors: tiptop
 * @LastEditTime: 2020-07-19 15:07:59
 */

const path = require("path");
const packageConfig = require("../../package.json");
const config = require("../config");

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === "production"
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;
  return path.posix.join(assetsSubDirectory, _path);
};

/**
 *抛出错误的通知回调
 */
exports.createNotifierCallback = () => {
  const notifier = require("node-notifier");

  return (severity, errors) => {
    if (severity !== "error") return;

    const error = errors[0];
    const filename = error.file && error.file.split("!").pop();

    notifier.notify({
      title: packageConfig.name,
      message: `${severity}: ${error.name}`,
      subtitle: filename || "",
      icon: path.join(__dirname, "logo.png"),
    });
  };
};

// cssloader处理方式
exports.cssLoaders = function (options) {
  options = options || {}; // 这样写的好处，可以防止在options为undefine的时候确保他是一个对象

  const cssLoader = {
    loader: "css-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };

  const postcssLoader = {
    loader: "postcss-loader",
    options: {
      sourceMap: options.sourceMap,
    },
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader];

    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: { ...loaderOptions, sourceMap: options.sourceMap },
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // return ["MiniCssExtractPlugin.loader"].concat(loaders);
      return ["style-loader"].concat(loaders);
    }
    return ["style-loader"].concat(loaders);
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus"),
  };
};
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp(`\\.${extension}$`),
      use: loader,
    });
  }
  console.log(output);
  return output;
};
