const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

module.exports = class Persistence {
    constructor({ fileName = '' }) {
        this.fileName = fileName;
    }

    async persist(data) {
        if (this.hasFileName()) {
            return await writeFile(this.fileName, JSON.stringify(data));
        } else {
            return Promise.resolve();
        }
    }

    async load() {
        if (this.hasFileName()) {
            try {
                return JSON.parse(await readFile(this.fileName));
            } catch (err) {
                return Promise.resolve();
            }
        } else {
            return Promise.resolve();
        }
    }

    hasFileName() {
        return !!this.fileName;
    }
};