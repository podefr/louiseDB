'use strict';

const { getTestAPI } = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Given DB is initialized with basic getters and setters', () => {
    before(async () => {
        await louiseDB.init({
            setters: getTestAPI('001-setters'),
            getters: getTestAPI('001-getters')
        });
        await louiseDB.invokeSet('insertRecords', [
            { name: 'Jon Snow', jobs: ['ranger', 'steward', 'commander'] },
            { name: 'Samwell Tarly', jobs: ['steward'] },
            { name: 'Aegon', jobs: ['maester'] }
        ]);
    });

    describe('When reloading setters', () => {
        before(async () => {
            await louiseDB.reload({
                setters: getTestAPI('004-setters')
            });
        });

        it('Then new setters are available', async () => {
            expect(await louiseDB.invokeSet('pushRecord', {
                name: 'Danny Targaryen', jobs: ['queen']
            })).to.eql({
                characters: [
                    { name: 'Jon Snow', jobs: ['ranger', 'steward', 'commander'] },
                    { name: 'Samwell Tarly', jobs: ['steward'] },
                    { name: 'Aegon', jobs: ['maester'] },
                    { name: 'Danny Targaryen', jobs: ['queen'] }
                ]
            });
        });
    });

    describe('When reloading getters', () => {
        before(async () => {
            await louiseDB.reload({
                getters: getTestAPI('004-getters')
            });
        });

        it('Then new getters are available', async () => {
            expect(await louiseDB.invokeGet('searchByName', 'ar')).to.eql([
                { name: 'Samwell Tarly', jobs: ['steward'] },
                { name: 'Danny Targaryen', jobs: ['queen'] }
            ]);
        });
    });

    after(async () => {
        await louiseDB.stop();
    });
});
