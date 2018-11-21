const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: './src/validador.js',
  output: {
    filename: 'validador.min.js',
    path: './dist'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new MinifyPlugin()
  ]
};