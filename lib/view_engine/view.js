/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js');
var View = {}, createView;

View.addPartial = function (name, partialView) {
  this.partials[name] = partialView;
};

View.load = function () {
  this.loadViewModel();
};

View.loadViewModel = function () {
  var viewModelPath = this.getViewModelPath(); 

  this.viewModel = Object.create(require(viewModelPath).viewModel);
};

View.extendViewModel = function (properties) {
  var property;

  for (property in properties) {
    if (properties[property] !== "function") {
      this.viewModel[property] = properties[property];
    }
  }
};

View.getViewModelPath = function () {
  return Core.Config.core.viewModelsPath + "/" + this.name + ".js";
};

View.getViewPath = function () {
  return Core.Config.core.viewsPath + "/" + this.name + "." + this.format;
};

View.toString = function () {
  return "{ " + this.name + " }";
};

// Creates view instance
// name - must be in form of category/name
// format - view format
createView = function (name, format) {
  var obj = Object.create(View);
  obj.partials = {};
  obj.name = name;
  obj.format = format;

  return obj;
};

exports.createView = createView;
