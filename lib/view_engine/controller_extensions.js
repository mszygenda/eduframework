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
}

var injectExtensions = function(controller) {
  controller.merge(new ControllerExtensions())
}

exports.injectExtensions = injectExtensions;
