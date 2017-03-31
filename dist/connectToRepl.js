"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.connectToRepl = connectToRepl;

var _defaults = require("./defaults");

var net = require("net");
function connectToRepl() {
	var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var socketPath = opts.socket || _defaults.SOCKET_PATH;
	var socket = net.connect(socketPath);

	process.stdin.pipe(socket);
	socket.pipe(process.stdout);

	var handleClose = function handleClose() {
		process.stdin.setRawMode(false);
		process.stdin.pause();
		socket.removeListener("close", handleClose);
		socket.removeListener("close", handleConnect);
	};

	var handleConnect = function handleConnect() {
		process.stdin.resume();
		process.stdin.setRawMode(true);
	};

	socket.on("connect", handleConnect);
	socket.on("close", handleClose);

	process.stdin.on("end", function () {
		socket.destroy();
	});
}