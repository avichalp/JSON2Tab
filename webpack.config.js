const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
	//'webpack-dev-server/client?http://localhost:8080',
	//'webpack/hot/only-dev-server',
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
	contentBase: './dist',
	hot: true,
	inline: true
    },
    resolve: {
	extensions: ['', '.js', '.jsx']
    }
};
