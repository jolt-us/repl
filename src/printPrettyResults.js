const vm = require("vm");

export function printPrettyResults(socket) {
  return function (cmd, context, filename, callback) {
    let result;
    try {
      result = vm.runInContext(cmd, context);
      if (result instanceof Promise) {
        result.then((res) => callback(null, res), e => callback(e));
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
