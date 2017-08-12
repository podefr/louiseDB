const { setStore, getStore } = require('../store/index');

let getters;
let setters;

const API = {
    init(args) {
        try {
            setters = args.setters ? require(args.setters) : {};
            getters = args.getters ? require(args.getters) : {};

            sendSuccess('Data accessor initialized');
        } catch (err) {
            sendError({
                message: 'Failed initializing data accessors',
                err
            });
        }
    },

    invokeGet({ functionName, args }) {
        console.log(`get: calling ${functionName} with ${ JSON.stringify(args) }`);

        if (getters[functionName]) {
            try {
                const value = getters[functionName](getStore(), ...args);
                sendSuccess(value);
            } catch (err) {
                sendError(err);
            }
        } else {
            handleAccessorNotFound(functionName);
        }
    },

    invokeSet({ functionName, args }) {
        console.log(`set: calling ${functionName} with ${ JSON.stringify(args) }`);

        if (setters[functionName]) {
            try {
                setStore(setters[functionName](getStore(), ...args));
                sendSuccess('updated');
            } catch (err) {
                sendError(err);
            }
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
    console.error(error);
    sendError(error);
}

function handleAccessorNotFound(functionName) {
    const error = `Store Accessor not found: ${ functionName } isn't specified`;
    console.error(error);
    sendError(error);
}

function sendSuccess(payload) {
    process.send({
        success: payload
    });
}

function sendError(error) {
    process.send({
        error
    });
}
