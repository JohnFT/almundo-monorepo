'use strict'

const Sequelize = require('sequelize'); // Module ORM
const setupDatabase = require('../lib/db'); // Module connection db

module.exports = function amenitiesModel(config) {
    // Instance connection db
    const sequelize = setupDatabase(config);

    // Define Table Model -- Create table amenities on db
    return sequelize.define('amenitie', {
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
}