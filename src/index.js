'use strict';

const {fork} = require('child_process');

let accessorProcess;

module.exports = {
    start({getters, setters}) {
        accessorProcess = fork(__dirname + '/storeAccess/index');
        accessorProcess.send({
            'init': {
                getters,
                setters
            }
        });
        console.log('Data accessor started');
    },

    async invokeGet(functionName, ...args) {
        return await sendReceive('invokeGet', functionName, args);
    },

    async invokeSet(functionName, ...args) {
        return await sendReceive('invokeSet', functionName, args);
    }
};

async function sendReceive(topicName, functionName, args) {
    accessorProcess.send({
        [topicName]: {
            functionName,
            args
        }
    });

    return new Promise(resolve => accessorProcess.on('message', resolve));
}
