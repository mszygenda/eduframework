/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var service = require('./http_engine/service.js');
var reqHandler = require('./http_engine/request_handler.js');

exports.merge(service);
exports.merge(reqHandler);
