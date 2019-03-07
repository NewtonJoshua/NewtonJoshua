'use strict';

/**
 * express module
 * @constant
 */
const express = require('express');

/**
 * bodyParser
 * @constant
 */
const bodyParser = require('body-parser');

/**
 * compression
 * @constant
 */
const compression = require('compression');

/**
 * helmet
 * @constant
 */
const helmet = require('helmet');

/**
 * express app
 * @constant
 * @type {object}
 */
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());

app.use(express.static(__dirname + '/../dist/NewtonJoshua'));
app.use('/app', express.static(__dirname + '/../dist/NewtonJoshua'));

/**
 * https service
 * @constant
 */
const http = require('http');

/**
 * server
 * @constant
 */
// const server = http.createServer(app);

const port = 6006;

/**
 * server
 * @constant
 */
try {
	;app.listen(port, () => {
		console.log('info', 'ServerStart', {
			port: port,
			NODE_ENV: process.env.NODE_ENV
		});
	});
} catch (e) {
	console.log('error', 'Server 4000 error', e);
}

/**
 * Default route serving the web app.
 * @name get/
 * @function
 * @param {callback} middleware - Express middleware.
 */
app.get('/', (req, res) => {
    res.sendFile('/app/index.html');
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve('dist/NewtonJoshua/index.html'));
});
