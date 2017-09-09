module.exports = {
    pushNumber(store, number) {
        store.array = store.array || [];
        store.array.push(number);

        return store;
    }
};