'use strict';

const { getStore, setStore } = require("./instance/index");

const API = {
    getters: {}, setters: {}
};

module.exports = {
    start({ getters, setters, initialValue = {} }) {
        API.getters = require(getters);
        API.setters = require(setters);
        setStore(initialValue);
    },

    invokeGet(functionName, ...args) {
        const getter = API.getters[functionName];

        if (getter) {
            return getter(getStore(), ...args);
        } else {
            console.error(`Getter not found ${ functionName }`);
        }
    },

    invokeSet(functionName, ...args) {
        const setter = API.setters[functionName];

        if (setter) {
            return setStore(setter(getStore(), ...args));
        } else {
            console.error(`Setter not found ${ functionName }`);
        }
    }
};