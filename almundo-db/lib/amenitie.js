'use strict'

module.exports = function setupAmenitie(amenitieModel) {
    async function createOrUpdate(amenitie) {
        const old = await amenitieModel.findById(amenitie.id);
        if (old) {
            const update = await amenitieModel.update(old, amenitie);
            return update ?await amenitieModel.findById(amenitie.id) : old;
        }
        const res = await amenitieModel.create(amenitie);
        return res;
    }

    function findAll() {
        return amenitieModel.findAll();
    }

    return {
        createOrUpdate,
        findAll
    }
}