/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

// require section;
var fs = require('fs');
var Core = require('../core.js');

// Loads application config into Core.Config global object;
var loadConfig = function () {
  var r = require(Core.configPath + '/routes.js'),
      viewConfig = require(Core.configPath + '/views.js'),
      coreConfig = require(Core.configPath + '/core.js');

  Core.Config.routes = r.routes;
  Core.Config.views = viewConfig;
  Core.Config.core = coreConfig;
};

// Loads and parses JSON file;
var loadJSON = function (file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
};

//
// Exposed public api;
//

exports.loadConfig = loadConfig;
