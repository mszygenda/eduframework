/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, EduFramework: false */

// System core modules;
var sys = require('sys');
var events = require('events');
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Framework core modules;
var Core = exports;
var util = require('./util.js');
var configuration = require('./configuration.js');
var initializer = require('./module_initializer.js');

var Engines, setPaths, initialize, loadCustomModules, loadCustomModule;

Engines = {
  httpEngine: require('./http_engine.js'),
  routingEngine: require('./routing_engine.js'),
  controllerEngine: require('./controller_engine.js'),
  viewEngine: require('./view_engine.js')
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
  var module = require(name);

  Engines[name] = module;
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
exports.initialize = initialize;
