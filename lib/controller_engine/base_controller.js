/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js'), 
    BaseController;

BaseController = {};

BaseController.respond = function (options) {
  var server = Core.HttpEngine.server;

  this.response.controllerOptions = options;
  this.response.controllerVariables = this.vars;
  server.emit('controller-action-invoked', server, this.request, this.response);
};

exports.createController = function (request, response) {
  var obj = Object.create(BaseController);
  obj.request = request;
  obj.response = response;
  obj.vars = {}; 
  obj.name = request.controller;
  obj.action = request.action;
  obj.session = request.session;
  obj.parameters = request.variables;

  return obj;
};

exports.BaseController = BaseController;
