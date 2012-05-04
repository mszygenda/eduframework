/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../lib/core.js');

var onStart = function () {
  Core.logger.info("ready to accept connections");
  Core.logger.info("listening on port " + Core.HttpEngine.server.port);
}

var onEnd = function () {
  Core.logger.info("shutting down server");
}

console.log("Starting eduFramework server");

Core.initialize(function () {
  Core.HttpEngine.server.on('start', onStart);
  Core.HttpEngine.server.on('stop', onEnd);
  Core.HttpEngine.server.start();
});
