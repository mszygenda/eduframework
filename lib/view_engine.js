/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js');

var template = require('./view_engine/template_engine_manager.js');
var viewManager = require('./view_engine/view_manager.js');
var controllerExtensions = require('./view_engine/controller_extensions.js');
var viewContext = require('./view_engine/view_context.js');
var renderers = require('./view_engine/renderers.js');
var utils = require('./view_engine/utils.js');

exports.merge(template);
exports.merge(viewManager);
exports.merge(viewContext);
exports.merge(utils);
exports.Renderers = renderers;

// Engine initialization code
exports.dependencies = function () {
  return [Core.ControllerEngine];
};

exports.initialize = function () {
  Core.ControllerEngine.ControllerManager.on(
    'before-invoke-action', 
    controllerExtensions.injectExtensions
  );
};
