const path = require('path');
const webpack = require('webpack');
const proxy = require('http-proxy-middleware');

module.exports = {
  devtool: '#inline-source-map',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename:  'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html?minimize=false'
        //exclude: [root('src', 'index.html')]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot-loader!babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 8080,
    host: 'localhost',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    watchContentBase: true,
    proxy: {
      "/api": "http://localhost:5000"
    },
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
