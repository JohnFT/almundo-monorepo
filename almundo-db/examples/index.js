'use strict'
const Sequelize = require('sequelize');
const debug = require('debug')('almundo:db:setup');
const chalk = require('chalk'); // Estilizar string en la consola
const db = require('../');
const Op = Sequelize.Op

async function run() {

    const config = {
        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        logging: s => debug(s),
        freezeTableName: true,
        operatorsAliases: {
            $and: Op.and,
            $or: Op.or,
            $eq: Op.eq,
            $gt: Op.gt,
            $lt: Op.lt,
            $lte: Op.lte,
            $like: Op.like
        },
        setup: true,
        memory: false
    }

    const hotels = await db(config).catch(handleFatalError);

    try {
        await hotels.createOrUpdate({
            id: '11111111',
            uuid: new Date().toDateString(),
            name: 'Hotel Johns',
            stars: 5,
            price: 1994.18,
            image: '4900059_30_b.jpg',
            amenities: [
                'business-center'
            ]
        });
        const hotel = await hotels.findAll();
        console.log(hotel.length);
    } catch (err) {
        handleFatalError(err);
    }

    console.log("Success!");
    process.exit(0);
}

// Catch Error connection
function handleFatalError(err) {
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`);
    console.error(err.stack);
    // Kill process code error
    process.exit(1);
}

run();