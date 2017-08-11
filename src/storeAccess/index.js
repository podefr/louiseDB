const { setStore, getStore } = require('../store/index');

let getters;
let setters;

const API = {
    init(args) {
        setters = args.setters ? require(args.setters) : {};
        getters = args.getters ? require(args.getters) : {};
        console.log('Accessor initialized');
    },

    invokeGet({ functionName, args }) {
        console.log(`get: calling ${functionName} with ${ JSON.stringify(args) }`);

        if (getters[functionName]) {
            process.send({ success: getters[functionName](getStore(), ...args)});
        } else {
            handleAccessorNotFound(functionName);
        }
    },

    invokeSet({ functionName, args }) {
        console.log(`set: calling ${functionName} with ${ JSON.stringify(args) }`);

        if (setters[functionName]) {
            process.send({ success: setStore(setters[functionName](getStore(), ...args))});
        } else {
            handleAccessorNotFound(functionName);
        }
    }
};

process.on('message', message => {
    Object.entries(message).forEach(([key, value ]) => {
        if (API[key]) {
            API[key](value);
        } else {
            handleAPIMethodNotFound(key);
        }
    });
});

function handleAPIMethodNotFound(methodName) {
    const error = `Store Access Internal Error: ${ methodName } isn't a valid method.`;
    process.send({ error });
    console.error(error);
}

function handleAccessorNotFound(functionName) {
    const error = `Store Accessor not found: ${ functionName } isn't specified`;
    process.send({ error });
    console.error(error);
}
