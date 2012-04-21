var fs = require('fs');

var ViewManager = {}
  // Renders view determined by examining viewContext and additional params
ViewManager.render = function (viewContext, params) {
  var view, preferredFormat, templateEngine, useLayout, renderer;

  view = this.findView(viewContext, params)
  preferredFormat = 'html'
  templateEngine = {}
  useLayout = !params || params.useLayout ? true : false;

  for (format in view.availableFormats) {
    if (format == preferredFormat)
    {
      templateEngine = Core.ViewEngine.TemplateEngineManager.load(format)
      templateEngine = new templateEngine()
      break
    }
  }

  if (useLayout) {
    renderer = Core.ViewEngine.Renderers.MemoryRenderer.createRenderer();
    renderer.on('end', function () {
      Core.ViewEngine.ViewManager.renderLayout(viewContext, renderer.data, params);
    });
  } else {
    renderer = Core.ViewEngine.Renderers.ResponseRenderer.createRenderer(viewContext.response);
  }

  templateEngine.on('template-rendered', this.templateRendered);
  templateEngine.render(this.getViewPath(view, preferredFormat), viewContext, renderer.out); 
}

  // Renders action response within default layout view
  //
  // viewContext - Context of invoked action
  // data - Rendered response for action
ViewManager.renderLayout = function (viewContext, data, params) {
  var viewModel, layoutContext;
  console.log('rendering layout');

  viewModel = Core.ViewEngine.Utils.loadViewModel('layouts', 'default');
  viewModel.content = data;
  viewModel.merge(viewContext.viewModel);

  layoutContext = Core.ViewEngine.createViewContext();
  layoutContext.request = viewContext.request;
  layoutContext.response = viewContext.response;
  layoutContext.controller = 'layouts';
  layoutContext.action = 'default';
  layoutContext.viewModel = viewModel;

  Core.ViewEngine.ViewManager.render(layoutContext, { useLayout: false });
};

ViewManager.templateRendered = function(viewFile, viewContext, output) {
  console.log('template ' + viewFile + ' rendered');
  output.end();
}
  
ViewManager.getViewPath = function(view, format) {
  return view.path + '/' + view.name + '.' + format
}

ViewManager.findView = function(context, params) {
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

ViewManager.getMatchingViews = function(view) {
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

exports.ViewManager = ViewManager
