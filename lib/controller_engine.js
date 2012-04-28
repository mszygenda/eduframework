/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var cm = require('./controller_engine/controller_manager.js');

exports.merge(cm);
exports.dependencies = function () {
  return [Core.RoutingEngine];
};
