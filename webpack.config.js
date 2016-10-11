const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'build.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      components: path.join(__dirname, 'src/components'),
      layouts: path.join(__dirname, 'src/layouts'),
      views: path.join(__dirname, 'src/views'),
      Api: path.join(__dirname, 'src/Api.js')
    }
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  stylus: {
    use: [autoprefixer()]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
}
