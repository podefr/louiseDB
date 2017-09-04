'use strict';

const { getTestAPI } = require('./helpers');
const expect = require('expect.js');

const louiseDB = require('../src/index');

describe('Given DB is initialized', () => {
    before(async () => {
        await louiseDB.init({
            setters: getTestAPI('002-setters'),
            getters: getTestAPI('002-getters')
        });
    });

    describe('When an album is added', () => {
        before(async () => {
            await louiseDB.invokeSet('addAlbum', 'Ride The Lightning', ['Fight Fire with Fire']);
        });

        it('Then tracks are available', async () => {
            expect(await louiseDB.invokeGet('getTracks', 'Ride The Lightning')).to.eql(['Fight Fire with Fire']);
        });

        describe('When records are inserted with a faulty setter', () => {
            before(async () => {
                try {
                    await louiseDB.invokeSet('addTracks', 'Ride The Lightning', ['Ride The Lightning']);
                } catch (err) {

                }
            });

            describe('When retrieving tracks for album', () => {
                let tracks;

                before(async () => {
                    tracks = await louiseDB.invokeGet('getTracks', 'Ride The Lightning');
                });

                it('Then newer tracks weren\'t added', () => {
                    expect(tracks).to.eql(['Fight Fire with Fire']);
                });
            });
        });
    });

    after(async () => {
        await louiseDB.stop();
    });
});
