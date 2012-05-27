/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

// requires
var events = require('events'),
    fs = require('fs'),
    Core = require('../core.js'),
    ControllerManager,
    controllerCache = {};

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
ControllerManager.createControllerForRequest = function (request, response, success) {
  var name = request.controller,
      userActions,
      controller,
      self = this;

  if (this.isControllerCached(name)) {
    controller = self.controllerFromCache(name); 
    return success(controller.contextInstance(request, response));
  }

  this.findControllerActions(name, function (actions) {
    controller = Core.ControllerEngine.createController(actions);
    self.cacheController(name, controller);

    success(controller.contextInstance(request, response));
  });
};

ControllerManager.findControllerActions = function (name, success) {
  var self = this, userActions;

  userActions = this.loadUserActions(name, success, function () {
    self.loadSystemActions(name, success);
  });
};

ControllerManager.isControllerCached = function (name) {
  return (typeof controllerCache[name] !== 'undefined');
};

ControllerManager.cacheController = function (name, controller) {
  controllerCache[name] = controller;
};

ControllerManager.controllerFromCache = function (name) {
  return controllerCache[name];
};

// Loads user defined controller object
ControllerManager.loadUserActions = function (name, success, error) {
  var userController, path;

  path = this.getControllerPath(name);

  fs.stat(path, function (err, stat) {
    if (err || !stat.isFile()) {
      return error("Failed to stat user actions", name);
    }

    userController = require(path).controller;
    success(userController);
  });
};

// Loads framework-defined controller
ControllerManager.loadSystemActions = function (name, success) {
  var controller = Core.ControllerEngine.SystemControllers[name.classCamelize()].controller;

  if (typeof (controller) !== 'undefined') {
    success(controller);
  }
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

  controller = this.createControllerForRequest(request, response, this.Callbacks.controllerCreated);
};

ControllerManager.Callbacks = {};

ControllerManager.Callbacks.controllerCreated = function (controller) {
  var action = controller.action;

  try {
    controller[action].apply(controller);
  } catch (e) {
    Core.logger.error('failed to run controller action ' + controller.getId() + ': ' + e.toString());
    controller.response.end();
  }
};

//
// Exposed public api
//

exports.ControllerManager = Object.create(ControllerManager);
exports.manager = exports.ControllerManager;
