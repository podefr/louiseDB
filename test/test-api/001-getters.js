'use strict';

module.exports = {
    getByJob(store, job) {
        return store.characters.filter(({ jobs }) => {
            return jobs.indexOf(job) >= 0;
        });
    }
};