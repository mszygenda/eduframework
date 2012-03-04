fs = require('fs');

var loadConfig = function() {
  r = require('../../config/routes.js');
  viewConfig = require('../../config/views.js');
  Core.Config.routes = r.routes;
  Core.Config.views = viewConfig
}

var loadJSON = function(file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
}

exports.loadConfig = loadConfig
