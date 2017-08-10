'use strict';

const {fork} = require('child_process');
const {getStore, setStore} = require('./store/index');

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

    invokeGet(functionName, ...args) {
        const getter = API.getters[functionName];

        if (getter) {
            accessorProcess.send('get');
            return getter(getStore(), ...args);
        } else {
            console.error(`Getter not found ${ functionName }`);
        }
    },

    invokeSet(functionName, ...args) {
        const setter = API.setters[functionName];

        if (setter) {
            accessorProcess.send('set');
            return setStore(setter(getStore(), ...args));
        } else {
            console.error(`Setter not found ${ functionName }`);
        }
    }
};
