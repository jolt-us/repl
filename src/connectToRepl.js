const net   = require("net");
import {SOCKET_PATH} from "./defaults";

export function connectToRepl(opts = {}){
	const socketPath = opts.socket || SOCKET_PATH;
	const socket  = net.connect(socketPath);

	process.stdin.pipe(socket);
	socket.pipe(process.stdout);

	const handleClose = () => {
	  process.stdin.setRawMode(false);
	  process.stdin.pause();
	  socket.removeListener("close", handleClose);
	};

	const handleConnect = () => {
	  process.stdin.resume();
	  process.stdin.setRawMode(true);
	};

	socket.on("connect", handleConnect);
	socket.on("close", handleClose);

	process.stdin.on("end", () => {
	  socket.destroy();
	});
}