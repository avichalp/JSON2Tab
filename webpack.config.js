const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: [
	'./src/index'
    ],
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
	hot: true
    },
    external: {
	'cheerio': 'window',
	'react/lib/ExecutionEnvironment': true,
	'react/lib/ReactContext': true
    },
    resolve: {
	extensions: ['', '.js', '.jsx']
    },
    plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
    ]
};
