import net from "net";
import repl from "repl";
import fs from "fs";
import {printPrettyResults} from "./printPrettyResults";
import {connectToRepl} from "./connectToRepl";
import {SOCKET_PATH} from "./defaults";

export class Repl {
	constructor(options = {}){
		this.context = options.context || {};
		this.banner = options.banner || "";
		this.socket = options.socket || SOCKET_PATH;
	}

	static connect(opts){
		return connectToRepl(opts);
	}

	listen(){
		fs.stat(this.socket, (err) => {
			!err && fs.unlinkSync(this.socket);
			net.createServer((socket) => {
				socket.write(this.banner);
				socket.write("\n");
				const {context} = repl.start({
					prompt: "> ",
					eval: printPrettyResults(socket),
					input: socket,
					output: socket,
					terminal: true
				}).on("exit", () => {
					socket.end();
				});
				Object.assign(context, this.context);
			}).listen(this.socket)
		});
	}
}