/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

// System core modules;
var sys = require('sys'),
    events = require('events'),
    http = require('http'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),
    Core = exports,
    util = require('./util.js'),
    configuration = require('./configuration.js'),
    initializer = require('./module_initializer.js'),
    Engines, 
    setPaths, 
    initialize, 
    loadCustomModules, 
    loadCustomModule;

Engines = {
  httpEngine: require('./http_engine.js'),
  routingEngine: require('./routing_engine.js'),
  controllerEngine: require('./controller_engine.js'),
  viewEngine: require('./view_engine.js'),
  utilEngine: require('./util_engine.js'),
  appEngine: require('./app_engine.js')
};

initialize = function (callback) {
  setPaths();
  configuration.initialize(function () {
    loadCustomModules();
    initializer.createModuleInitializer(Engines).initialize(callback);
  });
};

loadCustomModules = function () {
  var modules = Core.Config.core.modules, i;

  for (i = 0; i < modules.length; i += 1) {
    loadCustomModule(modules[i]);
  }
};

loadCustomModule = function (name) {
  var module = null;
  try {
    module = require(name);
    Engines[name] = module;
  } catch (e) {
    console.log('failed to load custom module ' + name);
  }
};

setPaths = function () {
  exports.applicationPath = path.resolve('.');
  exports.configPath = exports.applicationPath + '/config';
};
// Module exports;

EduFramework = exports;
exports.Config = configuration;
exports.Util = util;
exports.RoutingEngine = Engines.routingEngine;
exports.HttpEngine = Engines.httpEngine;
exports.ControllerEngine = Engines.controllerEngine;
exports.ViewEngine = Engines.viewEngine;
exports.UtilEngine = Engines.utilEngine;
exports.initialize = initialize;
