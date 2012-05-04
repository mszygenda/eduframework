/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js');
// Class declaration

// Singleton class used to manage template engines
var TemplateEngineManager = {};

// Loads template engine for provided format
//
// format - template format
TemplateEngineManager.load = function (format) {
  var engineName = Core.Config.views.templates[format], engine;

  if (typeof this.templateEngines[engineName] !== 'undefined') {
    engine = this.templateEngines[engineName]
  } else {
    engine =  Core.ViewEngine.EmptyTemplateEngine;
  }
  
  return engine;
};

TemplateEngineManager.register = function (name, engine) {
  this.templateEngines[name] = engine;
};

TemplateEngineManager.templateEngines = {};

//
// Exposed public api
//

exports.TemplateEngineManager = Object.create(TemplateEngineManager);
