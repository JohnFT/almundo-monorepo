'use strict'

const http = require('http'); // modulo http para crear el servidor
const debug = require('debug')('almundo:api'); 
const asyncify = require('express-asyncify'); // Module express suport async awaite
const express = require('express'); // modulo framework express
const chalk = require('chalk'); // modulo para estilizar el log 
const port = process.env.PORT || 3000; // puerto de escucha del servidor
const app = asyncify(express()); // intancia de express
const server = http.createServer(app); // creando el servidor 

const routes = require('./api'); // Modulo de rutas

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

// Escuchado el servidor
server.listen(port, () => {
    console.log(`${chalk.green('[almundo-api]')} server listening port ${port}`);
})