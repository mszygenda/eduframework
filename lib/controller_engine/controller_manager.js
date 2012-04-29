/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

// requires
var events = require('events');
var Core = require('../core.js');

// Class declaration

// ControllerManager is singleton class used to manage controllers
var ControllerManager = Object.create(events.EventEmitter.prototype);

//
// Class methods
//

// Creates instance of controller
//
// name - name of controller
// parameters - parameters to inject into controller
// req - HttpRequest object to inject into controller
// resp - HttpResponse object to inject into controller
ControllerManager.createController = function (name, parameters, req, resp) {
  var className, controller, controllerClass;

  className = name.capitalize() + "Controller";
  controllerClass = require(Core.Config.core.controllerPath + '/' + name + '_controller.js');

  controller = Object.create(Core.ControllerEngine.BaseController);
  controller.merge(controllerClass.controller);

  controller.name = name;
  controller.parameters = parameters;
  controller.request = req;
  controller.response = resp;
  controller.session = req.session;
  controller.vars = {};

  return controller;
};

// Executes action of specified controller
//
// name - name of the controller
// action - action name to execute on controller object
// parameters - parameters to inject into controller
// req - HttpRequest object to inject into controller
// resp - HttpResponse object to inject into controller
ControllerManager.invokeAction = function (name, action, parameters, req, resp) {
  var c = this.createController(name, parameters, req, resp);
  c.action = action;
  this.emit('before-invoke-action', c);

  c[action].apply(c);

  this.emit('after-invoke-action', c);
};

//
// Exposed public api
//

exports.ControllerManager = Object.create(ControllerManager);
exports.manager = exports.ControllerManager;
