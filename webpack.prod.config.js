const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: [
	'webpack-dev-server/client?http://localhost:8080',
	'webpack/hot/only-dev-server',
	'./src/index.js'
    ],
    output: {
	path: __dirname + '/dist',
	publicPath: '/',
	filename: 'bundle.js'
    },
    plugins: [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.UglifyJsPlugin({
	    minimize: true,
	    compress: {
		warnings: false
	    }
	}),
	new webpack.DefinePlugin({
	    'process.env': {
		'NODE_ENV': JSON.stringify('production')
	    }
	})
    ],
    module: {
	loaders: [{
	    test: /\.jsx?$/,
	    exclude: /node_modules/,
	    loader: 'react-hot!babel'
	}]
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