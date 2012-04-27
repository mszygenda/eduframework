/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

// Class declaration

// It provides data needed by view engine required to render response
var ViewContext = {};
ViewContext.toString = function () {
  return "ViewContext: { " + this.controller + ", " + this.action + " }";
};

//
// Exposed public api
//

// ViewContext class factory method. Instantiates empty ViewContext object
exports.createViewContext = function () {
  var object = Object.create(ViewContext);
  object.request = null;
  object.response = null;
  object.controller = null;
  object.action = null;
  object.viewModel = null;

  return object;
};
