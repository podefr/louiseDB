'use strict';

const { resolve } = require('path');
const noqldb = require('../src/index');

function getFilePath(name) {
    return resolve(__dirname, name);
}

noqldb.start({
    setters: getFilePath('./setters'),
    getters: getFilePath('./getters')
});

async function main() {
    try {
        await noqldb.invokeSet("insertRecord");
        await noqldb.invokeSet("insertRecords");

        console.log(await noqldb.invokeGet("getByJob", "steward"));
    } catch (err) {
        console.error(err);
    }
}

main();
