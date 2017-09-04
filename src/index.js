'use strict';

const { fork } = require('child_process');

let accessorProcess;

module.exports = {
    async init(args) {
        if (isCurrentProcessRunning()) {
            throw new Error('Already started, please call stop() first on your running instance');
        }

        accessorProcess = fork(__dirname + '/storeAccess');
        console.log('Started master DB process');

        return await sendReceive('init', args);
    },

    async stop() {
        if (accessorProcess) {
            return new Promise((resolve, reject) => {
                accessorProcess.on('exit', (...args) => {
                    console.log(`Successfully stopped master DB process`);
                    resolve(args);
                });
                accessorProcess.on('error', err => {
                    console.log(`Error stopping master DB process: ${err}`);
                    reject(err);
                });

                console.log('Stopping master DB process');
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
            [topicName]: args
        });
    });
}

function isCurrentProcessRunning() {
    return accessorProcess && !accessorProcess.killed;
}
