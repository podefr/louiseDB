'use strict';

const cloneDeep = require('clone-deep');

module.exports = {
    jsonCopy(json) {
        return cloneDeep(json);
    }
};