const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');
const fontFace = require('stylus-font-face');

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
      lib: path.join(__dirname, 'src/lib')
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
    use: [
      autoprefixer(),
      fontFace({limit: 8000})
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css')
  ]
}
