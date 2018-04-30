'use strict'

const Sequelize = require('sequelize'); // Module ORM
const setupDatabse = require('../lib/db'); // Module conntection db

module.exports = function HotelAmenitiesModel(config) {
    // Instance connection db
    const sequelize = setupDatabse(config);

    // Define Table Model -- Create table hotelamenities on db
    return sequelize.define('hotelamenities', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true        
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        }
    })
}