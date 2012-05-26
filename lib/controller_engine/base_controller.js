/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var fs = require('fs'),
    Core = require('../core.js'),
    BaseController;

BaseController = {};

BaseController.respond = function (options) {
  var server = Core.HttpEngine.server;

  this.response.controllerOptions = options;
  this.response.controllerVariables = this.vars;
  server.emit('controller-action-invoked', server, this.request, this.response);
};

BaseController.respondWithFile = function (path) {
  fs.createReadStream(path).pipe(this.response);
};

BaseController.redirectTo = function (controller, action) {
  this.request.controller = controller;
  this.request.action = action;

  Core.ControllerEngine.manager.createControllerAndInvokeActions(
    this.request,
    this.response
  );
};

BaseController.notFound = function () {
  this.response.writeHead(404);
  this.response.end();
  Core.logger.error("Couldn't find matching response for this action " + this.getId());
};

BaseController.getId = function () {
  return this.name + "#" + this.action;
};

exports.createController = function (request, response) {
  var obj = Object.create(BaseController);
  obj.request = request;
  obj.response = response;
  obj.vars = {}; 
  obj.name = request.controller;
  obj.action = request.action;
  obj.session = request.session;
  obj.params = request.variables;

  return obj;
};

exports.BaseController = BaseController;
