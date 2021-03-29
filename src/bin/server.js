"use strict";
exports.__esModule = true;
exports.onListening = exports.onError = exports.normalizePort = void 0;
var dotenv = require("dotenv");
var app = require("../../app");
var http = require("http");
var logger = require("winston");
dotenv.config();
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.SERVER_PORT || '3000');
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var _port = parseInt(val, 10);
    if (isNaN(_port)) {
        // named pipe
        return val;
    }
    if (_port >= 0) {
        // port number
        return _port;
    }
    return false;
}
exports.normalizePort = normalizePort;
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.onError = onError;
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    logger.info('Listening on ' + bind);
}
exports.onListening = onListening;
