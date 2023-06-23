const webpack = require('webpack');
const path = require('path');

const isProduction = false;

module.exports = function(_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  return  [{
    mode: 'production',
    devtool: 'cheap-module-source-map',
    entry : {
      'src/pages/options/index.build' : './src/pages/options/index.js',
      'src/pages/options/popup.build' : './src/pages/options/popup.js',
    },
    output: {
      path: path.resolve(__dirname, '.'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development"
            }
          }
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx"]
    }
      
  }]
}