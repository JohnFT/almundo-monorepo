'use strict'
const hotels = require('../mocks/hotels');
module.exports = function setupHotel(HotelModel) {
    function findAll() {
        return HotelModel ? HotelModel.findAll() : hotels;
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
            const cond = {
                where: {
                    uuid: hotel.uuid
                }
            }
            const exist = await HotelModel.findOne(cond);
            if (exist) {
                const update = await HotelModel.update(hotel, cond);
                return update ? HotelModel.findOne(cond) : exist;
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