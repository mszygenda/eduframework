// Class declaration

// ControllerManager is singleton class used to manage controllers
var ControllerManager = function () { }
sys.inherits(ControllerManager, events.EventEmitter)

//
// Class methods
//

// Creates instance of controller 
//
// name - name of controller
// parameters - parameters to inject into controller
// req - HttpRequest object to inject into controller
// resp - HttpResponse object to inject into controller
ControllerManager.prototype.createController = function (name, parameters, req, resp) {
  var className = name.capitalize() + "Controller";
  require('../../app/controllers/' + name + '_controller.js');

  controller = eval("new " + className + "()");
  controller.name = name;
  controller.parameters = parameters;
  controller.request = req;
  controller.response = resp;

  return controller;
}

// Executes action of specified controller
//
// name - name of the controller
// action - action name to execute on controller object
// parameters - parameters to inject into controller
// req - HttpRequest object to inject into controller
// resp - HttpResponse object to inject into controller
ControllerManager.prototype.invokeAction = function(name, action, parameters, req, resp) {
  var c = this.createController(name, parameters, req, resp);
  c.action = action;
  this.emit('before-invoke-action', c);

  eval("c." + action + "()");

  this.emit('after-invoke-action', c);
}

//
// Exposed public api
//

exports.ControllerManager = Object.create(ControllerManager.prototype)
exports.manager = exports.ControllerManager;
