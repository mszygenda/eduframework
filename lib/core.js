// System core modules
sys = require('sys');
events = require('events');
http = require('http');
url = require('url');
fs = require('fs');

// Framework core modules
var util = require('./util.js');
var configuration = require('./configuration.js');

var Engines = {
  routingEngine: require('./routing_engine.js'),
  httpEngine: require('./http_engine.js'),
  controllerEngine: require('./controller_engine.js'),
  viewEngine: require('./view_engine.js'),
}

var initialize = function() {
  configuration.loadConfig()

  for(engine in Engines) {
    if(typeof(Engines[engine].initialize) != 'undefined')
    {
      Engines[engine].initialize();
    }
  }
}

// Module exports
exports.Config = configuration
exports.Util = util
exports.RoutingEngine = Engines.routingEngine
exports.HttpEngine = Engines.httpEngine
exports.ControllerEngine = Engines.controllerEngine
exports.ViewEngine = Engines.viewEngine
exports.initialize = initialize
