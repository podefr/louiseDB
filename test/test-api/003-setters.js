'use strict';

module.exports = {
    addStates(store, states) {
        store.states = store.states || [];

        store.states.push(...states.map(state => {
            return {
                name: state[0],
                population: state[1]
            }
        }));

        return store;
    }
};