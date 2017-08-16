module.exports = {
    insertRecords(store, characters) {
        store.characters = characters;

        return store;
    }
};