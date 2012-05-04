/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, EduFramework: false */

var Core = require('./core.js');
var UtilManager = require('./util_engine/util_manager.js');

exports.dependencies = function () {
  return [];
};

exports.initialize = function () {
  Core.UtilEngine.UtilManager.loadDefaultLogger();
};

exports.merge(UtilManager);
