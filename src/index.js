'use strict';

const { fork } = require('child_process');

const log = require('./log');

let accessorProcess;

module.exports = {
    async init(args) {
        if (isCurrentProcessRunning()) {
            const error = 'Already started, please call stop() first on your running instance';
            log.error(error);
            throw new Error(error);
        }

        accessorProcess = fork(__dirname + '/storeAccess');
        log.info('Started master DB process');

        return await sendReceive('init', args);
    },

    async reload(args) {
        log.debug('reloading getters and setters', args);
        return await sendReceive('reload', args);
    },

    async stop() {
        if (accessorProcess) {
            return new Promise(async (resolve, reject) => {
                accessorProcess.on('exit', (...args) => {
                    log.info(`Successfully stopped master DB process`);
                    resolve(args);
                });
                accessorProcess.on('error', err => {
                    log.error(`Error stopping master DB process: ${err}`);
                    reject(err);
                });
                
                await sendReceive('persist');
                accessorProcess.kill();
            });
        }

        return Promise.resolve();
    },

    async invokeGet(functionName, ...args) {
        return await sendReceive('invokeGet', {
            functionName, args
        });
    },

    async invokeSet(functionName, ...args) {
        return await sendReceive('invokeSet', {
            functionName, args
        });
    }
};

function sendReceive(topicName, args) {
    return new Promise((resolve, reject) => {
        accessorProcess.once('message', message => {
            if (message.success) {
                resolve(message.success);
            } else {
                reject(new Error(JSON.stringify(message.error)));
            }
        });

        accessorProcess.send({
            [topicName]: args || null
        });
    });
}

function isCurrentProcessRunning() {
    return accessorProcess && !accessorProcess.killed;
}
