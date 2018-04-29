'use strict'

const Sequelize = require('sequelize'); // Module ORM
const setupDatabase = require('../lib/db'); // Module connection db

module.exports = function hoteModel(config){
    // Instance connection db
    const sequelize = setupDatabase(config);

    // Define Table Model -- Create table hotels on db
    return sequelize.define('hotel',{
        uuid: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false
        },
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull:false
        },
        image:{
            type: Sequelize.STRING,
            allowNull: false
        }
    }) 
}

