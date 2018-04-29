'use strict'
const http = require('http');
const express = require('express');
const chalk = require('chalk');
var path = require('path')
const app = express();
const server = http.createServer(app);
const port = process.env.PORT_STATIC || '3001'

app.use('/static', express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log(`${chalk.green('[almundo-api]')} server listening port ${port}`);
});