/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var ConsoleLogger = {};
var showMessage = function (type, message) {
  console.log(formatMessageType(type) + message);
};

var formatMessageType = function (type) {
  var time = (new Date()).toISOString();
  return "[ " + time + " ] " + type.toUpperCase() + " ";
};

ConsoleLogger.info = function (message) {
  showMessage('info', message);
};

ConsoleLogger.error = function (message) {
  showMessage('error', message);
};

ConsoleLogger.debug = function (message) {
  showMessage('debug', message);
};

exports.ConsoleLogger = ConsoleLogger;
