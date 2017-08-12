'use strict';

const { resolve } = require('path');
const noqldb = require('../src/index');

function getFilePath(name) {
    return resolve(__dirname, name);
}

async function main() {
    try {
        await noqldb.init({
            setters: getFilePath('./setters'),
            getters: getFilePath('./getters')
        });

        await noqldb.invokeSet('insertRecords');

        console.log(await noqldb.invokeGet('getByJob', 'steward'));
    } catch (err) {
        console.error('error', err);
    }
}

main();
