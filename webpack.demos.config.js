const webpack = require('webpack');
const path = require('path');

module.exports = [{
  entry: './demos/Demo1Plugin.vue',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'demo1-plugin.js',
    libraryTarget: 'var',
    library: 'Demo1Plugin'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
}, {
  entry: './demos/Demo2Plugin.vue',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'demo2-plugin.js',
    libraryTarget: 'var',
    library: 'Demo2Plugin'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
}];
