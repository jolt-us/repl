"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printPrettyResults = printPrettyResults;
var vm = require("vm");

function printPrettyResults(socket) {
  return function (cmd, context, filename, callback) {
    var result = void 0;
    try {
      result = vm.runInContext(cmd, context);
      if (result instanceof Promise) {
        result.then(function (res) {
          return callback(null, res);
        }, function (e) {
          return callback(e);
        });
      } else if (result instanceof Function) {
        socket.write(result.toString());
        socket.write("\n");
        callback(null, undefined);
      } else {
        callback(null, result);
      }
    } catch (e) {
      callback(e);
    }
  };
}