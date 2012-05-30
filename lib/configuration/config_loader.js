/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var fs = require('fs'),
    Core = require('../core.js'),
    Config = require('../configuration.js'),
    ConfigLoader = null;

ConfigLoader = (function () {
  var methods = {}, priv = {}, configFileRegexp;

  configFileRegexp = /^(\w+)\.js$/;

  methods.loadConfigFrom = function (path, callback) {
    fs.readdir(path, function (err, files) {
      priv.loadConfigFiles(path, files);

      if (typeof callback === 'function') {
        callback();
      }
    });
  };

  priv.loadConfigFiles = function (path, files) {
    var i;

    for (i = 0; i < files.length; i += 1) { 
      if (priv.isConfigFile(files[i])) {
        priv.loadConfigFile(path, files[i]);
      }
    }
  };

  priv.isConfigFile = function (file) {
    return configFileRegexp.test(file);
  };

  priv.loadConfigFile = function (path, file) {
    var configName = "", config;

    configName = priv.getConfigName(file);
    config = require(path + '/' + file).config;
    Config[configName] = config;
    
    return config;
  };

  priv.getConfigName = function (file) {
    var matches;
    
    matches = configFileRegexp.exec(file);

    return matches[1];
  };
  
  return methods;
}());

exports.ConfigLoader = ConfigLoader;
exports.Config = Config;
