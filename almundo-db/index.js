'use strict'
const setupDatabase = require('./lib/db'); // Module conection db
const setupHotelModel = require('./models/hotels'); // Model Hotel
const setupAmenitieModel = require('./models/amenities'); // Model Amenitie
const setupHotelAmenties = require('./models/hotelamenities'); // Model HotelAmenities
const setupHotel = require('./lib/hotel'); // Hotel actions
const setupAmenitie = require('./lib/amenitie'); // Anemitie actions
const setupHotelAmenitie = require('./lib/hotelamenities'); // HotelAnimitie actions
const defaults = require('defaults');

module.exports = async (config) => {
    let Hotels = [];
    let Amenities = [];
    let HotelAmenities = [];
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
        const hotelamenitiesModel = setupHotelAmenties(config);

        // Relations

        hotelModel.belongsToMany(amenitieModel, {
            through: hotelamenitiesModel
        });
        amenitieModel.belongsToMany(hotelModel, {
            through: hotelamenitiesModel
        });

        // Validate connection db
        await sequelize.authenticate();

        // Execute scripts creation
        if (config.setup) {
            await sequelize.sync({
                force: true
            });
        }

        Hotels = setupHotel(hotelModel, amenitieModel);
        Amenities = setupAmenitie(amenitieModel);
        HotelAmenities = setupHotelAmenitie(hotelamenitiesModel);
    } else {
        Hotels = setupHotel(null);
    }

    return {
        Hotels,
        Amenities,
        HotelAmenities
    };
};