Jolt's REPL lets you connect to a remote node process.

```
npm install @jolt-us/repl
# OR
yarn add @jolt-us/repl
```

Start with creating a connection to you system
```javascript
// index.js
const {Repl} = require("@jolt-us/repl");
const repl = new Repl({
   banner: "Connected to REPL on '"+process.env.NODE_ENV+"'",
   context: {users: require('./users-for-example')}
})
rpl.listen();
```

And create a client:

```javascript
// repl.js
const {Repl} = require("@jolt-us/repl");
Repl.connect();
```

The setup is complete!🤖
Now let’s connect to the process using a secure shell connection!

```bash
ssh 1.2.3.4 -t -c "node /var/app/repl.js"
Connected to REPL on 'production'
> users.activateUser("user-id")
```

Fun ain’t it?🎉
We have also added a custom behaviour — if you command returns a promise, it will wait for the promise to resolve, and only then print it out.
And if the returned value is a function it will print out the `toString` value of it, so you can see its content.
