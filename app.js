const main = require('./services/main');
const load = require('./services/load');
const shutdown = require('./db/shutdown');

const path = './csv/';

// source
const file = 'fromdb.csv';
// load(file+path);

// reference
const folder = path + 'refs';
// main(folder);

main();


process.on('exit', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('SIGKILL', shutdown);
process.on('uncaughtException', shutdown);