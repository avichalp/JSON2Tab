const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
	'./src/index.js'
    ],
    output: {
	path: __dirname + '/dist/',
	publicPath: '/dist/',
	filename:  'bundle.js'
    },
    module: {
	loaders: [
	    {
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'react-hot!babel'
	    },
	    {
		test: /\.css$/,
		loader: "style-loader!css-loader"
	    }
	]
    },
    devServer: {
	contentBase: './dist'
    },
    external: {
	'cheerio': 'window',
	'react/lib/ExecutionEnvironment': true,
	'react/lib/ReactContext': true
    },
    resolve: {
	extensions: ['', '.js', '.jsx']
    }
};
