// require section
var fs = require('fs');

// Loads application config into Core.Config global object
var loadConfig = function () {
  var r = require(Core.configPath + '/routes.js');
  var viewConfig = require(Core.configPath + '/views.js');
  var coreConfig = require(Core.configPath + '/core.js');

  Core.Config.routes = r.routes;
  Core.Config.views = viewConfig
  Core.Config.core = coreConfig;
}

// Loads and parses JSON file
var loadJSON = function (file) {
  var file = fs.readFileSync(file);
  return JSON.parse(file);
}

//
// Exposed public api
//

exports.loadConfig = loadConfig
