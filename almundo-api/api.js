'use strict'

const debug = require('debug')('almundo:api:routes'); // Name espace del debug
const express = require('express'); // Modulo de express
const asyncify = require('express-asyncify'); // Module express suport async await
const auth = require('express-jwt'); // Module athentication jwt
const db = require('almundo-db'); // Module almundo-db connection database 
const conf = require('./config'); // Module config db connection propierties
const api = asyncify(express.Router()); // Routes express

let services, hotels;

// Access-Control-Origin
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// MiddelWare singleton instans db conecction 
api.use('*', async (req, res, next) => {
    if (!services) {
        debug('Connecting to database');
        try {
            services = await db(conf.db);
        } catch (err) {
            return next(err);
        }

    }
    hotels = services;
    next();
});

// Find all hotels , auth(conf.auth)
api.get('/hotels', async (req, res, next) => {
    debug('A request has come to /hotel');
    let allHotels;
    try {
        allHotels = await hotels.findAll();
    } catch (err) {
        next(err);
    }
    res.send(allHotels);
});


// Find hotel by Id
api.get('/hotels/:id', (req, res, next) => {
    const {
        id
    } = req.params;
    if (id !== '1') {
        return next(new Error('Hotel not found'));
    }
    res.send({
        id
    })
});


module.exports = api;