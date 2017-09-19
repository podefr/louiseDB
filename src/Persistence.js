'use strict';

const fs = require('fs');
const { promisify } = require('util');

const log = require('./log');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

module.exports = class Persistence {
    constructor({ fileName = '' }) {
        this.fileName = fileName;
    }

    async persist(data) {
        if (this.hasFileName()) {
            log.debug(`Persisting current DB state into ${this.fileName}`);
            return await writeFile(this.fileName, JSON.stringify(data));
        } else {
            return Promise.resolve();
        }
    }

    async load() {
        if (this.hasFileName()) {
            try {
                log.debug(`Reloading ${this.fileName} into DB state`);                
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