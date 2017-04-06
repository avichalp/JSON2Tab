
var path = require('path');
var express = require('express');
var requests = require('request');
var app = express();
var PORT = process.env.PORT || 8080

// using webpack-dev-server and middleware in development environment
if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('./webpack.config');
    var compiler = webpack(config);
    PORT = 5000;
    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/dist/index.html')
});

app.get('/api/go', function(request, response) {
    response.setHeader('Content-Type', 'application/json');
    requests({
	'url': request.query.url + request.query.q
    }, function (error, res, body) {
	if (!error && res.statusCode == 200) {
	    response.send(body)
	} else {
	    response.send(JSON.stringify({'error': true}))
	}
    });
});

app.listen(PORT, function(error) {
    if (error) {
	console.error(error);
    } else {
	console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    }
});
