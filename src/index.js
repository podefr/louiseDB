'use strict';

const {fork} = require('child_process');

let accessorProcess;

module.exports = {
    async init({getters, setters}) {
        if (isCurrentProcessRunning()) {
            throw new Error('Already started, please call stop() first on your running instance');
        }

        accessorProcess = fork(__dirname + '/storeAccess/index');
        console.log('Started master DB process');

        return await sendReceive('init', {
            getters,
            setters
        });
    },

    async stop() {
        if (accessorProcess) {
            accessorProcess.on('close', () => Promise.resolve);
            console.log('Started master DB process');
            accessorProcess.kill();
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

async function sendReceive(topicName, args) {
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
