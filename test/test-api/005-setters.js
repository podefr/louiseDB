'use strict';

module.exports = {
    push(store, item) {
        store.array = store.array || [];
        store.array.push(item);

        return store;
    }
};