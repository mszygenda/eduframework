/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var router = require('./routing_engine/router.js');

exports.merge(router);
exports.dependencies = function () {
  return [Core.HttpEngine];
};
