/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var requestHandler = require('./view_engine/request_handler.js');
var template = require('./view_engine/template_engine_manager.js');
var viewManager = require('./view_engine/view_manager.js');
var viewContext = require('./view_engine/view_context.js');
var utils = require('./view_engine/utils.js');
var renderer = require('./view_engine/renderer.js');

exports.merge(template);
exports.merge(viewManager);
exports.merge(viewContext);
exports.merge(utils);

// Engine initialization code
exports.dependencies = function () {
  return [Core.ControllerEngine];
};

exports.initialize = function () {
  var reqHandler = requestHandler.createRequestHandler(); 
  Core.HttpEngine.server.on('controller-action-invoked', reqHandler.handle);
};

exports.render = function (viewContext) {
  if (viewContext.hasLayout()) {
    renderer.renderWithLayout(viewContext);
  } else {
    renderer.render(viewContext);
  }
};

exports.renderView = function (view, output, callback) {
  renderer.renderView(view, output, callback);
};
