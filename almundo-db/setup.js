'use strict'
const Sequelize = require('sequelize');
const debug = require('debug')('almundo:db:setup');
const inquirer = require('inquirer'); // Opciones en consola y toma de decisiones 
const chalk = require('chalk'); // Estilizar string en la consola
const db = require('./');
const Op = Sequelize.Op

const prompt = inquirer.createPromptModule();

async function setup() {
    const answare = await prompt([
        {
            type: 'confirm',
            name: 'setup',
            message: 'this will destory your database, are you sure'
        }
    ]);

    if(!answare.setup){
        return console.log('Nothing happend :)');
    }

    const config = {
        database: process.env.DB_NAME || 'almundo',
        username: process.env.DB_USER || 'almundo',
        password: process.env.DB_PASS || 'almundo2018*',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_MANAGE || 'postgres',
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
        setup: true
    }
    await db(config).catch(handleFatalError);

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
setup();