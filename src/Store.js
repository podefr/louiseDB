'use strict';

const { jsonCopy } = require('./helpers');

let defaultValue = {};

module.exports = class Store {
    constructor(initialValue = defaultValue) {
        this.store = initialValue;
        this.version = 0;
    }

    setStore(newStoreValue) {
        this.store = newStoreValue;
        this.version += 1;
    }

    getStore() {
        return this.store;
    }

    getStoreCopy() {
        return jsonCopy(this.store);
    }

    getVersion() {
        return this.version;
    }
};