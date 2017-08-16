'use strict';

const {getTestAPI} = require('./helpers');
const expect = require('expect.js');

const noqldb = require('../src/index');

describe('Given DB is initialized with basic getters and setters', () => {
    before(async() => {
        await noqldb.init({
            setters: getTestAPI('001-setters'),
            getters: getTestAPI('001-getters')
        });
    });

    describe('AND records are inserted', () => {
        beforeEach(async() => {
            await noqldb.invokeSet('insertRecords', [
                { name: 'Jon Snow', jobs: ['ranger', 'steward', 'commander'] },
                { name: 'Samwell Tarly', jobs: ['steward'] },
                { name: 'Aegon', jobs: ['maester'] }
            ]);
        });

        describe('When querying characters by job', () => {
            let records;

            beforeEach(async() => {
                records = await noqldb.invokeGet('getByJob', 'steward');
            });

            it('Then returns matching characters', () => {
                expect(records).to.eql([
                    {name: 'Jon Snow', jobs: ['ranger', 'steward', 'commander']},
                    {name: 'Samwell Tarly', jobs: ['steward']}
                ]);
            });
        });
    });

    after(async() => {
        await noqldb.stop();
    });
});