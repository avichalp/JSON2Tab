const path = require('path');
const express = require('express')
const port = (process.env.PORT || 8080)
const app = express()
const config = require('../webpack.config.js')

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const compiler = webpack(config)
    console.log('running in development')
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	contentBase: config.devServer.contentBase
    }))
    const indexPath = path.join(__dirname, '/../dist/index.html')
    app.get('/', function (_, res) {
	res.sendFile(indexPath)
    });

} else {
    app.use(express.static('dist'));
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
