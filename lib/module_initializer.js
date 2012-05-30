/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('./core.js'),
    ModuleInitializer = {}, 
    createModuleInitializer;

ModuleInitializer.initialize = function (callback) {
  this.calculateModuleInitializationOrder();
  this.initializeModules(callback);
};

ModuleInitializer.calculateModuleInitializationOrder = function () {
  var module = null;

  while (this.modules.length > 0) {
    module = this.modules.shift(); 

    if (this.dependenciesOrderedFor(module)) {
      this.orderedModules.push(module);
    } else {
      this.modules.push(module);
    }
  } 
};

ModuleInitializer.dependenciesOrderedFor = function (module) {
  var i, dependencies, dependency;

  dependencies = module.dependencies && module.dependencies() || [];

  for (i = 0; i < dependencies.length; i += 1) {
    dependency = dependencies[i];
    if (this.orderedModules.indexOf(dependency) === -1) {
      return false;
    }
  }

  return true;
};

ModuleInitializer.initializeModules = function (callback) {
  var i, module;

  for (i = 0; i < this.orderedModules.length; i += 1) {
    module = this.orderedModules[i];
    this.initializeModule(module);
  }

  if (typeof callback === 'function') {
    callback();
  }
};

ModuleInitializer.initializeModule = function (module) {
  if (typeof module.initialize === 'function') {
    module.initialize();
  }
};

createModuleInitializer = function (modules) {
  var obj = Object.create(ModuleInitializer);
  obj.modules = modules.toArray();
  obj.orderedModules = [];

  return obj;
};

exports.createModuleInitializer = createModuleInitializer;
