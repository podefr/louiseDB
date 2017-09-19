'use strict';

module.exports = {
    getTracks(store, album) {
        return store.albums[album];
    }
};