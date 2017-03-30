// index.js
const {Repl} = require("../");

function sayHi(name){
	return "Hello "+name+"!";
}

const repl = new Repl({
   banner: "Connected to REPL!, try calling hi(\"YOUR-NAME\")",
   context: {hi: sayHi}
})

repl.listen();

console.log("Now open a new window and run:\n node ./runMeSecond.js")