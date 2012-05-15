/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

// requires
var events = require('events'),
    Core = require('../core.js'),
    ControllerManager;

// Class declaration

// ControllerManager is singleton class used to manage controllers
ControllerManager = Object.create(events.EventEmitter.prototype);

//
// Class methods
//

// Creates controller object for given request
// You can't use it until all required data for controller are set
//
// It requires that: route is matched, session is provided, parameters are extracted
ControllerManager.createControllerForRequest = function (request, response) {
  var controllerPath, 
      controller,
      userActions;

  controller = Core.ControllerEngine.createController(request, response);
  userActions = this.loadUserActions(controller.name);
  controller.merge(userActions);

  return controller;
};

// Loads user defined controller object
ControllerManager.loadUserActions = function (name) {
  var userController, path;

  path = this.getControllerPath(name);
  userController = require(path).controller;

  return userController;
};

ControllerManager.getControllerPath = function (name) {
  return Core.Config.core.controllerPath + '/' + name + '.js';
};

// Creates controller object and invokes action retrieved by routing engine
//
// See createControllerForRequest for more details
ControllerManager.createControllerAndInvokeActions = function (request, response) {
  var controller,
      action;

  controller = this.createControllerForRequest(request, response);
  action = request.action;
  
  controller[action].apply(controller);
};

//
// Exposed public api
//

exports.ControllerManager = Object.create(ControllerManager);
exports.manager = exports.ControllerManager;
