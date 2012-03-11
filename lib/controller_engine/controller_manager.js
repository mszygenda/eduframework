var ControllerManager = function() {
  this.createController = function(name, parameters, req, resp) {
    var className = name.capitalize() + "Controller";
    require('../../app/controllers/' + name + '_controller.js');

    controller = eval("new " + className + "()");
    controller.name = name;
    controller.parameters = parameters;
    controller.request = req;
    controller.response = resp;

    return controller;
  }

  this.invokeAction = function(name, action, parameters, req, resp) {
    var c = this.createController(name, parameters, req, resp);
    c.action = action;
    this.emit('before-invoke-action', c);

    eval("c." + action + "()");

    this.emit('after-invoke-action', c);
  }
}

sys.inherits(ControllerManager, events.EventEmitter)

var instance = new ControllerManager();

exports.ControllerManager = instance
exports.manager = instance
