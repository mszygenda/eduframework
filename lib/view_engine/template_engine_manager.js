var TemplateEngineManager = function() {
  this.load = function(format) {
    engineDescriptor = Config.views.templateEngines[format]
    module = require(engine.module)

    return module[engine.MustacheTemplateEngine]
  }
}

exports.TemplateEngineManager = new TemplateEngineManager()
