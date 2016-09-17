const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
	'./src/index.js'
    ],
    output: {
	path: __dirname + '/dist/',
	publicPath: '/dist/',
	filename:  'bundle.js'

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
    resolve: {
	extensions: ['', '.js', '.jsx']
    }
};
