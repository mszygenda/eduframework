/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var config = require('./configuration/config.js');
var manager = require('./configuration/config_manager.js');

exports.merge(config);
exports.merge(manager);
