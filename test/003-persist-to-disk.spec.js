'use strict';

const {getTestAPI} = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Given DB is initialized with initial getters and setters', () => {
    before(async() => {
        await louiseDB.init({
            setters: getTestAPI('003-setters'),
            getters: getTestAPI('003-getters')
        });
    });

    describe('AND states are inserted', () => {
        beforeEach(async() => {
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

            beforeEach(async() => {
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

            describe('Given the instance is stopped', () => {
                beforeEach(async() => {
                    await louiseDB.stop();
                });

                describe('When reloading the instance', () => {
                    beforeEach(async() => {
                        await louiseDB.init({
                            setters: getTestAPI('003-setters'),
                            getters: getTestAPI('003-getters')
                        });
                    });

                    it('Then reloads the previous dataset', async() => {
                        expect(await louiseDB.invokeGet('getStateByPopulation', 10e6)).to.eql();
                    });
                });
            });
        });
    });

    after(async() => {
        await louiseDB.stop();
    });
});
