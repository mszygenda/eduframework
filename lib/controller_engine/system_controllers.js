/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */
var SystemControllers = {};

SystemControllers.StaticContent = require('./system_controllers/static_content.js');

exports.SystemControllers = SystemControllers;
