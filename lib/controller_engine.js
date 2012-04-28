/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var cm = require('./controller_engine/controller_manager.js');
var requestHandler = require('./controller_engine/request_handler.js');

var initialize = function () {
  var reqHandler = requestHandler.createRequestHandler();
  Core.HttpEngine.server.on('route-found', reqHandler.handle);
};

exports.merge(cm);

exports.dependencies = function () {
  return [Core.RoutingEngine];
};
exports.initialize = initialize;
