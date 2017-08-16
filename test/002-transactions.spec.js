'use strict';

const {getTestAPI} = require('./helpers');
const expect = require('expect.js');

const noqldb = require('../src/index');

describe('Given DB is initialized', () => {
    before(async() => {
        await noqldb.init({
            setters: getTestAPI('002-setters'),
            getters: getTestAPI('002-getters')
        });
    });

    describe('When an album is added', () => {
        beforeEach(async() => {
            await noqldb.invokeSet('addAlbum', 'Ride The Lightning', ['Fight Fire with Fire']);
        });

        it('Then tracks are available', async() => {
            expect(await noqldb.invokeGet('getTracks', 'Ride The Lightning')).to.eql(['Fight Fire with Fire']);
        });

        describe('When records are inserted with a faulty setter', () => {
            beforeEach(async() => {
                try {
                    await noqldb.invokeSet('addTracks', 'Ride The Lightning', ['Ride The Lightning']);
                } catch (err) {

                }
            });

            describe('When retrieving tracks for album', () => {
                let tracks;

                beforeEach(async() => {
                    tracks = await noqldb.invokeGet('getTracks', 'Ride The Lightning');
                });

                it('Then newer tracks weren\'t added', () => {
                    expect(tracks).to.eql(['Fight Fire with Fire']);
                });
            });
        });
    });

    after(async() => {
        await noqldb.stop();
    });
});
