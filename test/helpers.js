'use strict';

const { resolve } = require('path');

module.exports = {
    getTestAPI(name) {
        return resolve(__dirname, 'test-api', name);
    }
};
