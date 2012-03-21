Core = require('./lib/core.js')

var onStart = function() {
  console.log("ready to accept connections");
}

var onEnd = function() {
  console.log("bye");
}

Core.initialize();
var s = Core.HttpEngine.createService();

s.on('start', onStart);
s.on('stop', onEnd);
s.start();
