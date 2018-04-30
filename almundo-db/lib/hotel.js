'use strict'
let hotels = require('../mocks/hotels');
const amenities = require('../mocks/amenities');
const db = require('../lib/db');

module.exports = function setupHotel(HotelModel, amenitieModel) {
    hotels = getHotelsAmenities(hotels)

    async function findAll() {
        try {
            const sequelize = db(null);
            let res = await HotelModel.findAll();
            res = await Promise.all(res.map(async h => {
                h.amenities = await sequelize.query(`SELECT a.* FROM  hotelamenities, amenities a WHERE a.id = "amenitieId" AND "hotelId" = ${h.id}`, {
                    model: amenitieModel
                })
                return h;
            }))
            return res;
        } catch (err) {
            return [];
        }



    }

    function getHotelsAmenities(hotels) {
        return hotels.map(h => {
            h.amenities = h.amenities.map(a => {
                const amenit = amenities.find(am => am.id === a)
                return {
                    id: amenit.id,
                    name: amenit.name,
                    icon: amenit.icon
                }
            });
            return h;
        })
    }

    function findById(id) {
        return HotelModel ? HotelModel.findById(id) : hotels.find(h => h.id === id);
    }

    function findByName(name) {
        return HotelModel ? HotelModel.findByAll({
            where: {
                name
            }
        }) : hotels.find(h => h.name === name);
    }

    async function createOrUpdate(hotel) {
        if (HotelModel) {
            const old = await HotelModel.findById(hotel.id);
            if (old) {
                const update = await HotelModel.update(hotel, old);
                return update ? await HotelModel.findById(hotel.id) : old;
            }
            const result = await HotelModel.create(hotel);
            return result;
        } else {
            const oldHotel = hotels.find(h => h.id === hotel.id);
            if (oldHotel) {
                oldHotel = hotel;
            } else {
                hotels.push(hotel);
            }
            return hotels;
        }
    }

    return {
        findById,
        createOrUpdate,
        findAll,
        findByName
    }
}