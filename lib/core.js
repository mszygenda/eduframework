/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

// System core modules;
var sys = require('sys');
var events = require('events');
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Framework core modules;
var util = require('./util.js');
var configuration = require('./configuration.js');

var Engines, setPaths, initialize;

Engines = {
  routingEngine: require('./routing_engine.js'),
  httpEngine: require('./http_engine.js'),
  controllerEngine: require('./controller_engine.js'),
  viewEngine: require('./view_engine.js')
};

setPaths = function () {
  exports.applicationPath = path.resolve('.');
  exports.configPath = exports.applicationPath + '/config';
};

initialize = function () {
  var engine;

  setPaths();
  configuration.loadConfig();

  for (engine in Engines) {
    if (typeof(Engines[engine].initialize) === 'function') {
      Engines[engine].initialize();
    }
  }
};

// Module exports;
exports.Config = configuration;
exports.Util = util;
exports.RoutingEngine = Engines.routingEngine;
exports.HttpEngine = Engines.httpEngine;
exports.ControllerEngine = Engines.controllerEngine;
exports.ViewEngine = Engines.viewEngine;
exports.initialize = initialize;
