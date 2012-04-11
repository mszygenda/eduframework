Core = require('../lib/core.js')

var onStart = function () {
  console.log("ready to accept connections");
  console.log("listening on port " + s.port);
}

var onEnd = function () {
  console.log("shutting down server");
}

Core.initialize();
var s = Core.HttpEngine.createService();

s.on('start', onStart);
s.on('stop', onEnd);
s.start();
