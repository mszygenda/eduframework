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
  var className, controller;

  className = name.capitalize() + "Controller";
  require(Core.Config.core.controllerPath + '/' + name + '_controller.js');

  controller = eval("new " + className + "()");
  controller.name = name;
  controller.parameters = parameters;
  controller.request = req;
  controller.response = resp;
  controller.session = req.session; 

  return controller;
}

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

  eval("c." + action + "()");

  this.emit('after-invoke-action', c);
}

//
// Exposed public api
//

exports.ControllerManager = Object.create(ControllerManager)
exports.manager = exports.ControllerManager;
