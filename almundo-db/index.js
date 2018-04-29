'use strict'
const setupDatabase = require('./lib/db'); // Module conection db
const setupHotelModel = require('./models/hotels'); // Model Hotel
const setupAmenitieModel = require('./models/amenities'); // Model Amenitie
const setupHotel = require('./lib/hotel'); // Hotel actions
const defaults = require('defaults');

module.exports = async (config) => {
    let Hotels = {};
    if (!config.memory) {
        config = defaults(config, {
            dialect: process.env.DB_MANAGE || 'postgres',
            pool: {
                max: 10,
                min: 0,
                idle: 10000
            },
            query: {
                raw: true
            }
        })

        const sequelize = setupDatabase(config);
        const hotelModel = setupHotelModel(config);
        const amenitieModel = setupAmenitieModel(config);

        // Relations
        /*    hotelModel.hasMany(amenitieModel);
           hotelModel.belongsTo(amenitieModel); */

        // Validate connection db
        await sequelize.authenticate();

        // Execute scripts creation
        if (config.setup) {
            await sequelize.sync({
                force: true
            });
        }

        Hotels = setupHotel(hotelModel);
    } else {
        Hotels = setupHotel(null);
    }

    return Hotels;
};