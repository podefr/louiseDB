'use strict';

let store;
let version = 0;

module.exports = {
    setStore(newStoreValue) {
        store = newStoreValue;
        version += 1;
    },

    getStore() {
        return store;
    },

    getVersion() {
        return version;
    }
};