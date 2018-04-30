'use strict'

const debug = require('debug')('almundo:api:routes'); // Name espace del debug
const express = require('express'); // Modulo de express
const asyncify = require('express-asyncify'); // Module express suport async await
const auth = require('express-jwt'); // Module athentication jwt
const db = require('almundo-db'); // Module almundo-db connection database 
const conf = require('./config'); // Module config db connection propierties
const generateAuth = require('./auth'); // Mudule generates auth jwt
const api = asyncify(express.Router()); // Routes express
const bodyParser = require('body-parser'); // Module decodi json url 


let services, hotels;

// Access-Control-Origin
api.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middelware decoding json url
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({
    extended: false
}));

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
    hotels = services.Hotels;
    next();
});

// Find all hotels
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


// Find hotel by Name
api.get('/hotels/name/:name', async (req, res, next) => {
    debug('A request has come to /hotel/name/:name');
    const name = req.param('name');
    let hotel;
    try {
        hotel = await hotels.findByName(name);
    } catch (err) {
        next(err)
    }
    res.send(hotel);
});

// Find hotel by Name
api.get('/hotels/stars/:stars', async (req, res, next) => {
    debug('A request has come to /hotel/stars/:stars');
    const stars = req.param('stars');
    let hotel;
    try {
        hotel = await hotels.findByStars(stars);
    } catch (err) {
        next(err)
    }
    res.send(hotel);
});


// Find hotel by Name and stars
api.get('/hotels/:name/:stars', async (req, res, next) => {
    debug('A request has come to /hotel/stars/:stars');
    const name = req.param('name');
    const stars = req.param('stars');
    let hotel;
    try {
        hotel = await hotels.findByNameAndStars(name, stars);
    } catch (err) {
        next(err)
    }
    res.send(hotel);
});


// Create or Update Hotel
api.post('/hotels', auth(conf.auth), async (req, res, next) => {
    debug('A request post has come to /hotel');
    const hotel = req.body;
    let response;
    try {
        response = await hotels.createOrUpdate(hotel);
    } catch (err) {
        next(err)
    }
    res.send(response);
});

// Delete Hotel
api.delete('/hotels', auth(conf.auth), async (req, res, next) => {
    debug('A request delete has come to /hotel');
    const hotel = req.body;
    let response;
    try {
        response = await hotels.deleteHotel(hotel);
    } catch (err) {
        next(err)
    }
    res.send(response);
});

// Get JWT
api.get('/auth', async (req, res, next) => {
    debug('A request post has come to /auth');
    const pyload = {
        date: new Date().toString(),
        user: 'jfonseca'
    }
    try {
        var token = generateAuth.sign(pyload, conf.auth.secret, '1h')
        res.send({
            jwt: token
        });
    } catch (err) {
        next(err);
    }


});


module.exports = api;