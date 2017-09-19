'use strict';

module.exports = {
    getByJob(store, job) {
        return store.characters.filter(({ jobs }) => jobs.indexOf(job) >= 0);
    },

    searchByName(store, search) {
        return store.characters.filter(({ name }) => name.includes(search));
    }
};