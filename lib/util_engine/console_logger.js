/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../core.js'),
    showMessage, 
    formatMessageType,
    ConsoleLogger = {};

showMessage = function (type, message) {
  console.log(formatMessageType(type) + message);
};

formatMessageType = function (type) {
  var time = (new Date()).toISOString();
  return "[ " + time + " ] " + type.toUpperCase() + " ";
};

ConsoleLogger.info = function (message) {
  if (['info', 'debug'].indexOf(Core.Config.core.loggingLevel) !== -1) {
    showMessage('info', message);
  }
};

ConsoleLogger.error = function (message) {
  showMessage('error', message);
};

ConsoleLogger.debug = function (message) {
  if (['debug'].indexOf(Core.Config.core.loggingLevel) !== -1) {
    showMessage('debug', message);
  }
};

exports.ConsoleLogger = ConsoleLogger;
