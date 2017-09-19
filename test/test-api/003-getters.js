'use strict';

module.exports = {
    getStateByPopulation(store, population) {
        return store.states.filter((state) => {
            return state.population > population;
        });
    }
};