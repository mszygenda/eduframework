// Class declaration

// Singleton class used to manage template engines
var TemplateEngineManager = function () { }

// Loads template engine for provided format
//
// format - template format
TemplateEngineManager.prototype.load = function (format) {
  var module, engineDescriptor;

  engineDescriptor = Core.Config.views.templateEngines[format]
  module = require(engineDescriptor.module)

  return module[engineDescriptor.class]
}

//
// Exposed public api
//

exports.TemplateEngineManager = Object.create(TemplateEngineManager.prototype);
