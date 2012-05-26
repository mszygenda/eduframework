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

BaseController.setContext = function (request, response) {
  this.request = request;
  this.response = response;
  this.vars = {}; 
  this.name = request.controller;
  this.action = request.action;
  this.session = request.session;
  this.params = request.variables;
};

BaseController.contextInstance = function (request, response) {
  var copy = Object.create(this);
  copy.setContext(request, response);

  return copy;
};

exports.createController = function (userActions) {
  var obj = Object.create(BaseController);
  obj.merge(userActions);

  return obj;
};

exports.BaseController = BaseController;
