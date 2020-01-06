const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.join(__dirname, 'public-webpack'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public-webpack'),
    proxy: {
      '/api': 'http://localhost:3003',
    },
  },
};
