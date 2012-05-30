/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../core.js'),
    ConsoleLogger = require('./console_logger.js'),
    UtilManager = {};

UtilManager.loadDefaultLogger = function () {
  var defaultLogger = this.getDefaultLogger();

  this.setLogger(defaultLogger);
};

UtilManager.setLogger = function (logger) {
  Core.logger = logger;  
};

UtilManager.getDefaultLogger = function () {
  return ConsoleLogger.ConsoleLogger;
};

UtilManager.getLogger = function () {
  return Core.logger;
};

exports.UtilManager = UtilManager;
