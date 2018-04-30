'use strict'
let hotels = require('../mocks/hotels');
const amenities = require('../mocks/amenities');
const db = require('../lib/db');

module.exports = function setupHotel(HotelModel, amenitieModel) {

    hotels = getHotelsAmenities(hotels);

    function setupHotel() {
        return db(null);
    }


    async function findAll() {
        try {
            if(HotelModel){
                let res = await HotelModel.findAll();
                res = await Promise.all(res.map(async h => {
                    h.amenities = await setupHotel().query(`SELECT a.* FROM  hotelamenities, amenities a WHERE a.id = "amenitieId" AND "hotelId" = ${h.id}`, {
                        model: amenitieModel
                    })
                    return h;
                }))
                return res;
            }
            return hotels;
          
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

    async function findByName(name) {
        const res = HotelModel ? await setupHotel().query(`SELECT * FROM  hotels WHERE name like '%${name}%'`, {
            model: HotelModel
        }) : hotels.filter(h => h.name.indexOf(name) > -1);

        return res;
    }

    async function findByStars(stars) {
        const res = HotelModel ? await setupHotel().query(`SELECT * FROM  hotels WHERE stars = ${stars}`, {
            model: HotelModel
        }) : hotels.filter(h => h.stars == stars);
        return res || [];
    }

    async function findByNameAndStars(name, stars) {
        const res = HotelModel ? await setupHotel().query(`SELECT * FROM  hotels WHERE name like '%${name}%' AND stars = ${stars}`, {
            model: HotelModel
        }) : hotels.filter(h => h.stars == stars && h.name.indexOf(name) > -1);
        return res;
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
            let oldHotel = hotels.find(h => h.id === hotel.id);
            if (oldHotel) {
                oldHotel = hotel;
            } else {
                hotels.push(hotel);
            }
            return hotels;
        }
    }

    async function deleteHotel(hotel) {
        if (HotelModel) {
            const squlize = setupHotel();
            const deleteamenties = await squlize.query(`DELETE  FROM  hotelamenities WHERE "hotelId" = ${hotel.id}`);
            const res = await squlize.query(`DELETE  FROM  hotels WHERE "id" = ${hotel.id}`);
            return res;
        }

        hotels = hotels.filter(h => h.id !== hotel.id);
        return true;
    }

    return {
        setupHotel,
        findById,
        createOrUpdate,
        findAll,
        findByName,
        findByStars,
        findByNameAndStars,
        deleteHotel
    }
}
