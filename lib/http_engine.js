/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var service = require('./http_engine/service.js');
var reqHandler = require('./http_engine/request_handler.js');

var initialize = function () {
  exports.server = service.createService(Core.Config.core.server.port);
};

exports.merge(service);
exports.merge(reqHandler);
exports.initialize = initialize;
