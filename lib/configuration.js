/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js'),
    configLoader = require('./configuration/config_loader.js'),
    initialize;

initialize = function (callback) {
  configLoader.ConfigLoader.loadConfigFrom(Core.configPath, callback);
};

exports.initialize = initialize;
exports.merge(configLoader);
