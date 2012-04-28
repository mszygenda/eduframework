var Core = require('../lib/core.js');

var onStart = function () {
  console.log("ready to accept connections");
  console.log("listening on port " + Core.HttpEngine.server.port);
}

var onEnd = function () {
  console.log("shutting down server");
}

Core.initialize();

Core.HttpEngine.server.on('start', onStart);
Core.HttpEngine.server.on('stop', onEnd);
Core.HttpEngine.server.start();
