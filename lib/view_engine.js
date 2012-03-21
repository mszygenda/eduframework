var template = require('./view_engine/template_engine_manager.js');
var viewManager = require('./view_engine/view_manager.js');
var controllerExtensions = require('./view_engine/controller_extensions.js');
var viewContext = require('./view_engine/view_context.js');

exports.merge(template)
exports.merge(viewManager)
exports.merge(viewContext);

// Engine initialization code
exports.initialize = function () {
  Core.ControllerEngine.ControllerManager.on(
    'before-invoke-action', 
    controllerExtensions.injectExtensions);
}
