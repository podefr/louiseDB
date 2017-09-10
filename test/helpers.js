'use strict';

const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');

const unlink = promisify(fs.unlink);
const stat = promisify(fs.stat);

module.exports = {
    getTestAPI(name) {
        return resolve(__dirname, 'test-api', name);
    },

    async deleteFile(filename) {
        return await unlink(filename);
    },

    async getFileStats(filename) {
        return await stat(filename);
    },

    getLargeObject(nbItems) {
        return new Array(nbItems).fill('string');
    }
};
