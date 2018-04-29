'use strict'
/*
 Singleton sequelize ORM db 
*/
const Sequelize = require('sequelize'); // Module ORM
let sequelize = null;


/*
@param = config 
retrun connection db
*/
module.exports = function setupDatabase(config){
    if(!sequelize){
        sequelize = new Sequelize(config);
    }
    return sequelize;
}