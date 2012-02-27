fs = require('fs');

var loadConfig = function() {
  r = require('../../config/routes.js');
  Core.Config.routes = r.routes;
}

var loadJSON = function(file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
}

exports.loadConfig = loadConfig
