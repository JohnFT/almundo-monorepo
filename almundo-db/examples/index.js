'use strict'
const Sequelize = require('sequelize');
const debug = require('debug')('almundo:db:setup');
const chalk = require('chalk'); // Estilizar string en la consola
const db = require('../');
const Op = Sequelize.Op;
const amenitiesMock = require('../mocks/amenities');
const hotelsMock = require('../mocks/hotels');

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

    const models = await db(config).catch(handleFatalError);

    try {
        await Promise.all(amenitiesMock.map(async a => {
            await models.Amenities.createOrUpdate(a);
        }))
        await Promise.all(hotelsMock.map(async h => {
            await models.Hotels.createOrUpdate(h);
        }))

        const ha = []
        hotelsMock.map(h => {
            h.amenities.map(a => {
                ha.push({
                    hotelId: h.id,
                    amenitieId: a.id
                })
            })
        })
        await Promise.all(ha.map(async h => {
            await models.HotelAmenities.createOrUpdate(h);
        }));
        const amen = await models.Amenities.findAll();
        const hot = await models.Hotels.findAll();
        const ham = await models.HotelAmenities.findAll();

        console.log(amen.length, hot.length, ham.length);
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