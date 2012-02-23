var service = require('./server/service.js');

function onStart() {
  console.log("ready to accept connections");
}

function onEnd() {
  console.log("bye");
}

var s = new Service();

s.on('start', onStart);
s.on('stop', onEnd);
s.start();
