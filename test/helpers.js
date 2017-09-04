'use strict';

const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');

const unlink = promisify(fs.unlink);

module.exports = {
    getTestAPI(name) {
        return resolve(__dirname, 'test-api', name);
    },

    async deleteFile(filename) {
        return await unlink(filename);
    }
};
