var config = require('./webpack.config.js');
var webpack = require('webpack');

config.plugins.push(
  new webpack.DefinePlugin({
	  "process.env": {
	    "NODE_ENV": JSON.stringify("production")
	  }
  })
);

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin({
	  sourceMap: config.devtool && (config.devtool.indexOf("source-map") >= 0)
  })
);

module.exports = config;
