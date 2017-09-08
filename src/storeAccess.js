const serializeError = require('serialize-error');
const Store = require('./Store');
const log = require('./log');
const Persistence = require('./Persistence');

let getters;
let setters;
let persistence;
let store;

const API = {
    async init(args) {
        try {
            setters = args.setters ? require(args.setters) : {};
            getters = args.getters ? require(args.getters) : {};

            store = initStore();
            persistence = initPersistence(args);
            store.setStore(await persistence.load() || {});

            sendSuccess('Data accessor initialized');
        } catch (error) {
            sendError('ERROR 001: Failed initializing data accessors', error);
        }
    },

    async reload(args) {
        if (args.setters) {
            setters = reloadAPI(args.setters);
        }

        if (args.getters) {
            getters = reloadAPI(args.getters);
        }

        sendSuccess('Data accessor reloaded');
    },

    invokeGet({ functionName, args }) {
        log.debug(`get: calling ${functionName} with ${JSON.stringify(args)}`);

        if (getters[functionName]) {
            try {
                sendSuccess(getters[functionName](store.getStore(), ...args));
            } catch (error) {
                sendError(`ERROR 101: Failed calling invokeGet with ${functionName} / ${JSON.stringify(args)}`, error);
            }
        } else {
            handleAccessorNotFound(functionName);
        }
    },

    async invokeSet({ functionName, args }) {
        log.debug(`set: calling ${functionName} with ${JSON.stringify(args)}`);

        if (setters[functionName]) {
            try {
                store.setStore(setters[functionName](store.getStoreCopy(), ...args));
                await persistence.persist(store.getStore());
                sendSuccess(store.getStore());
            } catch (error) {
                sendError(`ERROR 201: Failed calling invokeSet with ${functionName} / ${JSON.stringify(args)}`, error);
            }
        } else {
            handleAccessorNotFound(functionName);
        }
    }
};

process.on('message', message => {
    Object.entries(message).forEach(([key, value]) => {
        if (API[key]) {
            API[key](value);
        } else {
            handleAPIMethodNotFound(key);
        }
    });
});

function initPersistence({ persist }) {
    return new Persistence({
        fileName: persist
    });
}

function initStore() {
    return new Store();
}

function handleAPIMethodNotFound(methodName) {
    const error = `Store Access Internal Error: ${methodName} isn't a valid method.`;
    log.error(error);
    sendError(error);
}

function handleAccessorNotFound(functionName) {
    const error = `Store Accessor not found: ${functionName} isn't specified`;
    log.error(error);
    sendError(error);
}

function sendSuccess(payload) {
    process.send({
        success: payload
    });
}

function sendError(message, error) {
    process.send({
        message,
        error: serializeError(error)
    });
}

function reloadAPI(fileName) {
    delete require.cache[require.resolve(fileName)];
    return require(fileName);
}
