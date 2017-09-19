'use strict';

module.exports = {
    addAlbum(store, album, tracks) {
        if (!store.albums) {
            store.albums = {};
        }

        store.albums[album] = tracks;
        return store;
    },

    addTracks(store, album, tracks) {
        store.albums[album].push(...tracks);

        throw new Error('unexpected things happen');

        return store;
    }
};