/*jslint devel: true, node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */
var Core = require('./core.js'),
    ClassDirectory = require('./class_directory.js'),
    initialize,
    dependencies;

initialize = function () {
  var classDirs, i, classDirLoaded, loadedCount = 0, classDir;
  
  classDirLoaded = function (classDir) {
    loadedCount += 1;
    Core.App[classDir.getName()] = classDir.modules;

    if (loadedCount === classDirs.length) {
      //Done initalizing app engine
      Core.logger.info('class directories loaded');
    }
  };
  classDirs = Core.Config.core.classDirectories;
  for (i = 0; i < classDirs.length; i += 1) {
    classDir = ClassDirectory.createClassDirectory(classDirs[i]); 
    classDir.load(classDirLoaded);
  }
};

dependencies = function () {
  return [Core.HttpEngine, Core.RoutingEngine, Core.ViewEngine, Core.ControllerEngine];
};

Core.App = {};

exports.initialize = initialize;
exports.dependencies = dependencies;
exports.merge(ClassDirectory);
