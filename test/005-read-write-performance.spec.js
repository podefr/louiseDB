'use strict';

const { getTestAPI } = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Given DB is initialized with basic getters and setters', function () {
    this.timeout(60000);

    let startDate;

    before(async () => {
        await louiseDB.init({
            setters: getTestAPI('005-setters'),
            getters: getTestAPI('005-getters'),
            persist: './performance-file-size'
        });
    });

    describe('When I set and get from the DB a 1000 times', () => {
        let startTime, endTime;

        before(async () => {
            startTime = Date.now();

            for (let i = 0; i < 1000; i++) {
                await louiseDB.invokeSet('pushNumber', i);
                await louiseDB.invokeGet('getLength');
            }

            endTime = Date.now();
        });

        it('Then runs in less than 10 seconds', () => {
            expect(endTime - startTime).to.lessThan(10000);
            console.log(`time is ${(endTime - startTime) / 1000}s`);
        });
    });

    after(async () => {
        await louiseDB.stop();
    });
});
