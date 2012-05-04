/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var router = require('./routing_engine/router.js');
var requestHandler = require('./routing_engine/request_handler.js');

var initialize = function () {
  var reqHandler = requestHandler.createRequestHandler();
  Core.HttpEngine.server.on('new-request', reqHandler.handle);
};

exports.merge(router);

exports.dependencies = function () {
  return [Core.HttpEngine, Core.UtilEngine];
};

exports.initialize = initialize;
