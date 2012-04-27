/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var fs = require('fs');
var path = require('path');
var util = require('./util.js');

var SkeletonBuilder = {};
var createSkeletonBuilder;

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
