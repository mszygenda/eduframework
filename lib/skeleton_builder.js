var fs = require('fs');
var util = require('../lib/util.js');

var SkeletonBuilder = {};
var createSkeletonBuilder;

SkeletonBuilder.createDirectoryStructure = function () {
  fs.mkdirSync(this.applicationPath); 
}

SkeletonBuilder.copyTemplate = function () {
  fs.copyDirectory(this.skeletonPath, this.applicationPath, true);
}

SkeletonBuilder.createApplication = function () {
  this.createDirectoryStructure();
  this.copyTemplate();
}

createSkeletonBuilder = function (appName) {
  var obj = Object.create(SkeletonBuilder);
  obj.appName = appName;
  obj.applicationPath = './' + appName;
  obj.skeletonPath = __dirname + '/../skeleton';

  return obj;
}

//
// Exposed public api
//
exports.createSkeletonBuilder = createSkeletonBuilder;
