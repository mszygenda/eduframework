fs = require('fs');

Config = {
  routes: function() {
    throw new Exception("No routes defined");
  }
}

function loadJSON(file) {
  file = fs.readFileSync(file);
  return JSON.parse(file);
}

function reloadConfig() {
  r = require('../config/routes.js');
  Config.routes = r.routes;
}

reloadConfig();
