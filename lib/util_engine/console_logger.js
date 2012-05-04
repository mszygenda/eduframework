/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var ConsoleLogger = {};
var showMessage = function (type, message) {
  console.log("[ " + type.toUpperCase() + " ] " + message);
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
