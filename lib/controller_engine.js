/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js'),
    cm = require('./controller_engine/controller_manager.js'),
    baseController = require('./controller_engine/base_controller.js'),
    requestHandler = require('./controller_engine/request_handler.js'),
    systemControllers = require('./controller_engine/system_controllers.js'),
    initialize;

initialize = function () {
  var reqHandler = requestHandler.createRequestHandler();
  Core.HttpEngine.server.on('route-found', reqHandler.handle);
};

exports.merge(cm);
exports.merge(baseController);
exports.merge(systemControllers);

exports.dependencies = function () {
  return [Core.RoutingEngine];
};
exports.initialize = initialize;
