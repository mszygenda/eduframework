/*jslint node: true, sloppy: true, vars: true, indent: 2, nomen: false */
/*global require: false, exports: false, __dirname: false */

var fs = require('fs'),
    path = require('path'),
    util = require('./util.js'),
    SkeletonBuilder = {},
    createSkeletonBuilder;

SkeletonBuilder.createDirectoryStructure = function () {
  fs.mkdirSync(this.applicationPath);
};

SkeletonBuilder.copyTemplate = function () {
  fs.copyDirectory(this.skeletonPath, this.applicationPath, true);
};

SkeletonBuilder.checkIfBuildPossible = function () {
  if (path.existsSync(this.applicationPath)) {
    throw "DestinationFolderExists";
  }
};

SkeletonBuilder.createApplication = function () {
  this.checkIfBuildPossible();
  this.createDirectoryStructure();
  this.copyTemplate();
};

createSkeletonBuilder = function (appName) {
  var obj = Object.create(SkeletonBuilder);
  obj.appName = appName;
  obj.applicationPath = path.resolve('./' + appName);
  obj.skeletonPath = path.resolve(__dirname + '/../skeleton');

  return obj;
};

//
// Exposed public api;
//
exports.createSkeletonBuilder = createSkeletonBuilder;
