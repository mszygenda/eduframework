var ControllerExtensions = function() {
  this.respond = function(params) {
    var viewContext = new Core.ViewEngine.ViewContext();
    viewContext.viewModel = this.viewModel;
    viewContext.request  = this.request;
    viewContext.response = this.response;
    viewContext.controller = this.name;
    viewContext.action = this.action; 
   
    Core.ViewEngine.ViewManager.render(viewContext, params);  
  }

  this.loadViewModel = function (controller, action) {
    var vmFile = Core.Config.core.viewModelPath + '/' + controller + '/' + action + '.js';
    console.log(vmFile);
    try {
      var viewModelClass = require(vmFile).viewModel;  
      return new viewModelClass();
    } 
    catch(e) {
      return {};
    }
  }
}

var injectExtensions = function(controller, action) {
  controller.merge(new ControllerExtensions())
  controller.viewModel = controller.loadViewModel(controller.name, controller.action)
}

exports.injectExtensions = injectExtensions;
