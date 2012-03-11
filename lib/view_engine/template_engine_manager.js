var TemplateEngineManager = function() {
  this.load = function(format) {
    engineDescriptor = Core.Config.views.templateEngines[format]
    module = require(engineDescriptor.module)

    return module[engineDescriptor.class]
  }
}

exports.TemplateEngineManager = new TemplateEngineManager()
