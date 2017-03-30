"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Repl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _net = require("net");

var _net2 = _interopRequireDefault(_net);

var _repl = require("repl");

var _repl2 = _interopRequireDefault(_repl);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _printPrettyResults = require("./printPrettyResults");

var _connectToRepl = require("./connectToRepl");

var _defaults = require("./defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repl = exports.Repl = function () {
	function Repl() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Repl);

		this.context = options.context || {};
		this.banner = options.banner || "";
		this.socket = options.socket || _defaults.SOCKET_PATH;
	}

	_createClass(Repl, [{
		key: "listen",
		value: function listen() {
			var _this = this;

			_fs2.default.stat(this.socket, function (err) {
				!err && _fs2.default.unlinkSync(_this.socket);
				_net2.default.createServer(function (socket) {
					socket.write(_this.banner);
					socket.write("\n");

					var _repl$start$on = _repl2.default.start({
						prompt: "> ",
						eval: (0, _printPrettyResults.printPrettyResults)(socket),
						input: socket,
						output: socket,
						terminal: true
					}).on("exit", function () {
						socket.end();
					}),
					    context = _repl$start$on.context;

					Object.assign(context, _this.context);
				}).listen(_this.socket);
			});
		}
	}], [{
		key: "connect",
		value: function connect(opts) {
			return (0, _connectToRepl.connectToRepl)(opts);
		}
	}]);

	return Repl;
}();