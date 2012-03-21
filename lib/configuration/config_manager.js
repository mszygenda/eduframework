// require section
var fs = require('fs');

// Loads application config into Core.Config global object
var loadConfig = function() {
  var r = require('../../config/routes.js');
  var viewConfig = require('../../config/views.js');
  var coreConfig = require('../../config/core.js');

  Core.Config.routes = r.routes;
  Core.Config.views = viewConfig
  Core.Config.core = coreConfig;
}

// Loads and parses JSON file
var loadJSON = function(file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
}

//
// Exposed public api
//

exports.loadConfig = loadConfig
