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

	socket.on("connect", function () {
		process.stdin.resume();
		process.stdin.setRawMode(true);
	});

	socket.on("close", function () {
		process.stdin.setRawMode(false);
		process.stdin.pause();
		socket.removeListener("close");
	});

	process.stdin.on("end", function () {
		socket.destroy();
	});

	process.stdin.on("data", function (data) {
		if (data.length === 1 && data[0] === 4) {
			process.stdin.emit("end");
		}
	});
}