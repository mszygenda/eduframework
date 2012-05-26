/*jslint devel: true, node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */
var fs = require('fs'),
    path = require('path'),
    ClassDirectory = {},
    jsFileRegexp,
    createClassDirectory;

jsFileRegexp = /(\w+)\.js$/;

ClassDirectory.getName = function () {
  return path.basename(this.path);
};

ClassDirectory.load = function (callback) {
  var self = this;
  
  fs.readdir(this.path, function (err, files) {
    if (err) {
      return callback(self);
    }

    this.classes = self.loadFiles(files, callback);
  }); 
};

ClassDirectory.loadFiles = function (files, callback) {
  var i = 0,
      file = null,
      loaded = 0,
      self = this,
      fileLoaded;

  fileLoaded = function (module) {
    self.modules.merge(module);
    loaded += 1;

    if (loaded === files.length) {
      callback(self);
    }
  };

  for (i = 0; i < files.length; i += 1) {
    file = files[i]; 
    
    this.loadFile(this.path + '/' + file, fileLoaded);
  }
};

ClassDirectory.loadFile = function (file, callback) {
  if (this.isJsFile(file)) {
    callback(this.loadJsFile(file));
  } else {
    fs.stat(file, function (err, stat) {
      var innerClassDir;

      if (stat.isDirectory()) {
        innerClassDir = createClassDirectory(file);
        innerClassDir.load(function () {
          var modules = {};
          modules[innerClassDir.getName()] = innerClassDir.modules;

          callback(modules);
        });
      } else {
        callback({});
      }
    });
  }
};

ClassDirectory.isJsFile = function (file) {
  return jsFileRegexp.test(file); 
};

ClassDirectory.loadJsFile = function (file) {
  var module = {},
      name;
  
  name = path.basename(file, '.js');

  try {
    module[name] = require(file);
  } catch (e) {
    module = {};
  }

  return module;
};

createClassDirectory = function (dirPath) {
  var obj = Object.create(ClassDirectory);

  obj.path = path.resolve(dirPath);
  obj.modules = {};

  return obj;
};

exports.createClassDirectory = createClassDirectory;
