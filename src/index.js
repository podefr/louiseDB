'use strict';

const {fork} = require('child_process');

let accessorProcess;

module.exports = {
    async init({getters, setters}) {
        accessorProcess = fork(__dirname + '/storeAccess/index');
        console.log('Started master DB process');

        return await sendReceive('init', {
            getters,
            setters
        });
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
        accessorProcess.send({
            [topicName]: args
        });

        accessorProcess.on('message', message => {
            if (message.success) {
                resolve(message.success);
            } else {
                reject(message.error);
            }
        })
    });
}
