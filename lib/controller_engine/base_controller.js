/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js');
var BaseController = {};

BaseController.respond = function (options) {
  var server = Core.HttpEngine.server;

  this.response.controllerOptions = options;
  this.response.controllerVariables = this.vars;
  server.emit('controller-action-invoked', server, this.request, this.response);
};

exports.BaseController = BaseController;
