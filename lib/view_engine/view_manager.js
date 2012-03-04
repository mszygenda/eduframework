var ViewManager = function() {
  this.render = function(viewContext, params) {
    var view = findView(viewContext, params)
    var preferredFormat = 'html'
    for(format in view.availableFormats) {
      if(format == preferredFormat)
      {
        templateEngine = Core.ViewEngine.TemplateEngineManager.load(format)
        break
      }
    }

    templateEngine.render(this.getViewPath(view, preferredFormat))
  }
  
  this.getViewPath = function(view, format) {
    return view.path + '/' + view.name + '.' + format
  }
}

exports.ViewManager = new ViewManager()
