fs = require('fs');

var loadConfig = function() {
  var r = require('../../config/routes.js');
  var viewConfig = require('../../config/views.js');
  var coreConfig = require('../../config/core.js');

  Core.Config.routes = r.routes;
  Core.Config.views = viewConfig
  Core.Config.core = coreConfig;
}

var loadJSON = function(file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
}

exports.loadConfig = loadConfig
