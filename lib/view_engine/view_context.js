/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js'),
    ViewContext = {};

// Class declaration
// It provides data needed by view engine to render response


ViewContext.load = function (callback) {
  var self = this;
  
  if (this.view) {
    this.initializeView(this.view);
  }

  if (this.layoutView) {
    this.initializeView(this.layoutView);
  }
};

ViewContext.initializeView = function (view) {
  view.load();
  view.extendViewModel(this.response.controllerVariables);
};

ViewContext.hasLayout = function () {
  return this.layoutView !== null;
};

ViewContext.toString = function () {
  var msg = "ViewContext: { ";
  msg += this.view ? " View: " + this.view.toString() : "";
  msg += this.layoutView ? " Layout: " + this.layoutView.toString() : "";
  msg += " }";

  return msg;
};

//
// Exposed public api
//

// ViewContext class factory method. Instantiates empty ViewContext object
exports.createViewContext = function (req, resp) {
  var object = Object.create(ViewContext);

  object.view = Core.ViewEngine.ViewManager.determineView(req, resp);
  object.layoutView = Core.ViewEngine.ViewManager.determineLayoutView(req, resp);
  object.request = req;
  object.response = resp;
  object.load();

  return object;
};
