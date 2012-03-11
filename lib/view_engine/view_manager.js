var fs = require('fs');

var ViewManager = function() {
  this.render = function(viewContext, params) {
    var view = this.findView(viewContext, params)
    var preferredFormat = 'html'
    var templateEngine = {}
    for(format in view.availableFormats) {
      if(format == preferredFormat)
      {
        templateEngine = Core.ViewEngine.TemplateEngineManager.load(format)
        templateEngine = new templateEngine()
        break
      }
    }

    templateEngine.render(this.getViewPath(view, preferredFormat), viewContext, viewContext.response)
    templateEngine.on('template-rendered', this.templateRendered)
  }

  this.templateRendered = function(viewFile, viewContext, output)
  {
    output.end()
  }
  
  this.getViewPath = function(view, format) {
    return view.path + '/' + view.name + '.' + format
  }

  this.findView = function(context, params) {
    if(typeof(params) == 'undefined') { params = new Object() }

    var view = {};

    if(typeof(params['view']) != 'undefined') {
      view = params['view']
    }
    else {
      view = { 
        path: Core.Config.core.viewPath + '/' + context.controller + '/',
        name: context.action
      }
    }

    // Extract available formats
    var existingViews = this.getMatchingViews(view)
    view.availableFormats = existingViews

    return view
  }

  this.getMatchingViews = function(view) {
    // Search in directory for particular view, and return each format
    var views = fs.readdirSync(view.path) 
    var viewRegexp = new RegExp('^' + view.name + '\\.(\\w+)$')
    var matching = new Object()

    for(i = 0; i < views.length; i++) {
      var viewFile = views[i] 
      var match = viewRegexp.exec(viewFile)
      if(match != null) {
        matching[match[1]] = viewFile
      }
    }

    return matching;
  }
}

exports.ViewManager = new ViewManager()
