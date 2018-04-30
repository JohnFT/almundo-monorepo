'use strict'

const http = require('http'); // module http create serve
const debug = require('debug')('almundo:api');
const asyncify = require('express-asyncify'); // Module express suport async awaite
const express = require('express'); // module framework express
const chalk = require('chalk'); // modules styles strings 
const port = process.env.PORT || 3000; // port  listening  server
const app = asyncify(express()); // init  express
const server = http.createServer(app); // create  server 


const routes = require('./api'); // Module routes

app.use('/api', routes); // Middelware routes ('api/route')


// Express Error Handler
app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`)
    if (err.message.match(/not found/)) {
        return res.status(400).send({
            err: err.message
        });
    }
    res.status(500).send({
        err: err.message
    });
})

function handleFatalError(err) {
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`);
    console.error(err.stack);
    process.exit(1);
}

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);

// Listening  server
server.listen(port, () => {
    console.log(`${chalk.green('[almundo-api]')} server listening port ${port}`);
})