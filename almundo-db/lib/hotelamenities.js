'use strict'

module.exports = function setupHotelAmenitie(hotelAmenitieModel) {
    function findAll() {
        return hotelAmenitieModel.findAll();
    }
    async function createOrUpdate(hotelAmenitie) {
        const old = await hotelAmenitieModel.findById(hotelAmenitie.id);
        if (old) {
            const update = await hotelAmenitieModel.update(old, hotelAmenitie);
            return update ? await hotelAmenitieModel.findById(hotelAmenitie.id) : old
        }
        const result = await hotelAmenitieModel.create(hotelAmenitie);
        return result;
    }
    return {
        createOrUpdate,
        findAll
    }
}