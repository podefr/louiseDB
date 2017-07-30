'use strict';

const { resolve } = require('path');
const noqldb = require('../src/index');

function getFilePath(name) {
    return resolve(__dirname, name);
}

noqldb.start({
    setters: getFilePath('./setters'),
    getters: getFilePath('./getters'),
    initialValue: []
});

noqldb.invokeSet("insertRecord");
noqldb.invokeSet("insertRecords");

console.log(noqldb.invokeGet("getByJob", "steward"));