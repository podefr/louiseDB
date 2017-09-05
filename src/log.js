const Log = require('log');

const { LOUISE_LOG_LEVEL } = process.env;

module.exports = new Log(Log[LOUISE_LOG_LEVEL]);