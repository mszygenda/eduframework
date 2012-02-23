ControllerManager = function() {
  this.createController = function(name, parameters, req, resp) {
    var className = name.capitalize() + "Controller";
    require('../app/controllers/' + name + '_controller.js');

    controller = eval("new " + className + "()");
    controller.parameters = parameters;
    controller.request = req;
    controller.response = resp;

    return controller;
  }

  this.invokeAction = function(name, action, parameters, req, resp) {
    var c = this.createController(name, parameters, req, resp);
    return eval("c." + action + "()");
  }
}

var instance = new ControllerManager();
module.exports = { 
  instance: function() { return instance; } 
}
