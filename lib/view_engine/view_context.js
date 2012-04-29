/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js');

// Class declaration

// It provides data needed by view engine required to render response
var ViewContext = {};
ViewContext.load = function (callback) {
  var self = this;
  
  if (this.view) {
    this.view.load();
  }

  if (this.layoutView) {
    this.layoutView.load();
    this.layoutView.extendViewModel({ contentViewModel: this.view.viewModel });
  }
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
