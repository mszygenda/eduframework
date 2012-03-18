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
    return {};
  }
}

var injectExtensions = function(controller, action) {
  controller.merge(new ControllerExtensions())
  controller.viewModel = controller.loadViewModel(controller.name, action)
}

exports.injectExtensions = injectExtensions;
