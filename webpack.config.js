const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './HelloPlugin.vue',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'hello-plugin.js',
    libraryTarget: 'var',
    library: 'HelloPlugin'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // vue-loader options go here
        },
      },
    ],
  },
};
