/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../core.js');
var Renderer = exports;

Renderer.renderWithLayout = function (viewContext) {
  this.prepareLayoutView(viewContext.layoutView, viewContext.view);
  return this.render(viewContext, true);
};

Renderer.prepareLayoutView = function (layout, view) {
  layout.addPartial("content", view);
};

Renderer.render = function (viewContext, useLayout) {
  var view = null;

  Core.logger.info("Rendering " + viewContext.toString());  
  if (useLayout) {
    view = viewContext.layoutView; 
  } else {
    view = viewContext.view;
  }

  this.renderView(view, viewContext.response);
};

Renderer.renderView = function (view, output, callback) {
  var templateEngine = Core.ViewEngine.TemplateEngineManager.load(view.format), self = this;

  templateEngine.render(view, output, function (view) {
    self.renderSuccess(view, callback);
  });
};

Renderer.renderSuccess = function (view, callback) {
  Core.logger.info("View rendered: " + view.toString());

  if (callback) {
    callback(view);
  }
};
