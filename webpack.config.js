const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');

module.exports = {
  entry: './frontend/index.js',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'build.js'
  },
  resolve: {
    alias: { vue: 'vue/dist/vue.js' }
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
      },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  stylus: {
    use: [autoprefixer()]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
}
