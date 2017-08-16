'use strict';

const {jsonCopy} = require('../helpers');

let store = {};
let version = 0;

module.exports = {
    setStore(newStoreValue) {
        store = newStoreValue;
        version += 1;
    },

    getStore() {
        return store;
    },

    getStoreCopy() {
        return jsonCopy(store);
    },

    getVersion() {
        return version;
    }
};