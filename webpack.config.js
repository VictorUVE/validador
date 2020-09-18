const path = require("path");

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/validador.js'),
  output: {
    filename: 'validador.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};