'use strict';

const { filesize } = require('humanize');

const { getTestAPI, deleteFile, getFileStats, getLargeObject } = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Load testing', function () {
    this.timeout(60000);

    const persistFileName = './performance-file-size';
    let startTime, nbOfReadWrites;

    beforeEach(async () => {
        await louiseDB.init({
            setters: getTestAPI('005-setters'),
            getters: getTestAPI('005-getters'),
            persist: persistFileName
        });

        nbOfReadWrites = 0;
    });

    it('Scenario 1: read+writes throughput tiny store size', async () => {
        const largeObject = getLargeObject(1);

        startTime = Date.now();

        while ((Date.now() - startTime) < 1000) {
            await louiseDB.invokeSet('push', largeObject);
            await louiseDB.invokeGet('getLength');
            nbOfReadWrites++;
        }
    });

    it('Scenario 2: read+write throughput small store size', async () => {
        const largeObject = getLargeObject(100);

        startTime = Date.now();

        while ((Date.now() - startTime) < 1000) {
            await louiseDB.invokeSet('push', largeObject);
            await louiseDB.invokeGet('getLength');
            nbOfReadWrites++;
        }
    });

    it('Scenario 3: read+write throughput medium store size', async () => {
        const largeObject = getLargeObject(1e5);

        startTime = Date.now();

        while ((Date.now() - startTime) < 1000) {
            await louiseDB.invokeSet('push', largeObject);
            await louiseDB.invokeGet('getLength');
            nbOfReadWrites++;
        }
    });

    it('Scenario 4: read+write throughput large store size', async () => {
        const largeObject = getLargeObject(1e7);

        startTime = Date.now();

        while ((Date.now() - startTime) < 1000) {
            await louiseDB.invokeSet('push', largeObject);
            await louiseDB.invokeGet('getLength');
            nbOfReadWrites++;
        }
    });

    it('Scenario 5: reads throughput large store size', async () => {
        await louiseDB.invokeSet('push', getLargeObject(1e7));

        startTime = Date.now();

        while ((Date.now() - startTime) < 1000) {
            await louiseDB.invokeGet('getLength');
            nbOfReadWrites++;
        }
    });

    afterEach(async () => {
        await louiseDB.stop();

        const { size } = await getFileStats(persistFileName);
        console.log(`${nbOfReadWrites} IOPs with ${filesize(size)} resulting store size`);

        await deleteFile(persistFileName);
    });
});
