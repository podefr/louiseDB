module.exports = {
    insertRecords(store) {
        store.push({ name: 'Jon Snow', jobs: ['ranger', 'steward', 'commander'] });
        store.push({ name: 'Samwell Tarly', jobs: ['steward'] });
        store.push({ name: 'Aegon', jobs: ['maester'] });

        return store;
    }
};