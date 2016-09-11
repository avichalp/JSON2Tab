const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');

module.exports = {
    app: function () {
	const app = express();
	const indexPath = path.join(__dirname, '/../dist/index.html');
	const publicPath = express.static(path.join(__dirname, '../dist'));
	
	app.use('/dist', publicPath);
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }));
	app.get('/', function (_, res) {
	    res.sendFile(indexPath)
	});

	app.post('/api/go', function (req, res) {
	    res.setHeader('Content-Type', 'application/json')
	    request({'url': req.body.url + req.body.queryString, 'headers': req.body.headers},
		    function (error, response, body) {
			if (!error && response.statusCode == 200) {
			    res.send(JSON.stringify(body))
			} else {
			    res.send(JSON.stringify({'error': true}))
			}
		    })

	})
	
	return app
    }
}
