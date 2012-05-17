/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */
var actions = exports.controller = {},
    fs = require('fs'),
    utils = {};

actions.load = function () {
  var self = this,
      path = this.params['path'];

  path = utils.getAbsoluteResourcePath(path);

  fs.stat(path, function (err, stat) {
    if (err) {
      self.notFound();
    } else {
      self.respondWithFile(path);
    }
  }); 
};

utils.getAbsoluteResourcePath = function (path) {
  var basePath = EduFramework.Config.core.staticPath;
  
  return basePath + '/' + path;
};
