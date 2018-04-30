'use strict'
const debug = require('debug');
module.exports = {
    db: {

        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        logging: s => debug(s),
        operatorsAliases: false,
        memory: true
    },
    auth:{
        secret: process.env.API_SECRET || 'almundo-secret'
    }
}
