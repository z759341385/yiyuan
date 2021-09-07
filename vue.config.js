// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const devServerPort = 8001; // TODO: get this variable from setting.ts

// const name = "济宁第一人民医院"; // TODO: get this variable from setting.ts
const name = "xxxx"; // TODO: get this variable from setting.ts

module.exports = {
  // publicPath: "./", // router hash 模式使用
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  lintOnSave: process.env.NODE_ENV === "development",
  assetsDir: "./",
  productionSourceMap: false,
  devServer: {
    port: devServerPort,
    open: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    },
    progress: false,
    proxy: {
      "a/": {
        target: process.env.VUE_APP_BASE_API,
        secure: false,
        changeOrigin: true
      }
    }
  },
  chainWebpack(config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin("html").tap(args => {
      args[0].title = name;
      return args;
    });
  }
  // configureWebpack: config => {
  //   config.plugins.push(new BundleAnalyzerPlugin());
  // }
};
