module.exports = {
    getByJob(store, job) {
        return store.filter(({ jobs }) => {
            return jobs.indexOf(job) >= 0;
        });
    }
};