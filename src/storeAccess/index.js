console.log('Accessor started');

let getters;
let setters;

const API = {
    init(args) {
        setters = args.setters ? require(args.setters) : {};
        getters = args.getters ? require(args.getters) : {};
    }
};

process.on("message", message => {
    Object.entries(message).forEach((key, value) => {
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


