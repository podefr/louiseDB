'use strict';

module.exports = {
    pushRecord(store, character) {
        store.characters.push(character);

        return store;
    }
};