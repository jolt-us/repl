const net   = require("net");
import {SOCKET_PATH} from "./defaults";

export function connectToRepl(opts = {}){
	const socketPath = opts.socket || SOCKET_PATH;
	const socket  = net.connect(socketPath);

	process.stdin.pipe(socket);
	socket.pipe(process.stdout);

	socket.on("connect", () => {
	  process.stdin.resume();
	  process.stdin.setRawMode(true);
	});

	socket.on("close", () => {
	  process.stdin.setRawMode(false);
	  process.stdin.pause();
	  socket.removeListener("close", done);
	});

	process.stdin.on("end", () => {
	  socket.destroy();
	});

	process.stdin.on("data", (data) => {
	  if (data.length === 1 && data[0] === 4) {
	    process.stdin.emit("end");
	  }
	});
}