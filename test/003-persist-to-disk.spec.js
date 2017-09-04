'use strict';

const { getTestAPI, deleteFile } = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Given DB is initialized with initial getters and setters and a persistence file', () => {
    before(async () => {
        await louiseDB.init({
            setters: getTestAPI('003-setters'),
            getters: getTestAPI('003-getters'),
            persist: './test-persistence-file'
        });
    });

    describe('AND states are inserted', () => {
        before(async () => {
            await louiseDB.invokeSet('addStates', [
                ['District of Columbia', 646449],
                ['California', 38332521],
                ['Michigan', 9895622],
                ['Tennesse', 6495978],
                ['Pennsylvania', 12773801]
            ]);
        });

        describe('When querying states by population', () => {
            let states;

            before(async () => {
                states = await louiseDB.invokeGet('getStateByPopulation', 10e6);
            });

            it('Then returns matching states', () => {
                expect(states).to.eql([
                    {
                        name: 'California',
                        population: 38332521
                    },
                    {
                        name: 'Pennsylvania',
                        population: 12773801
                    }
                ]);
            });

            describe('Given the instance is restarted', () => {
                before(async () => {
                    await louiseDB.stop();
                    await louiseDB.init({
                        setters: getTestAPI('003-setters'),
                        getters: getTestAPI('003-getters'),
                        persist: './test-persistence-file'
                    });
                });

                describe('When querying states by population', () => {
                    before(async () => {
                        states = await louiseDB.invokeGet('getStateByPopulation', 10e6);
                    });

                    it('Then reloads the previous dataset', () => {
                        expect(states).to.eql([
                            {
                                name: 'California',
                                population: 38332521
                            },
                            {
                                name: 'Pennsylvania',
                                population: 12773801
                            }
                        ]);
                    });
                });
            });
        });
    });

    after(async () => {
        await louiseDB.stop();
        await deleteFile('./test-persistence-file');
    });
});
