var root = EduFramework.applicationPath;

exports.merge({
  rootPath: root,
  viewPath: root + '/app/views',
  viewModelPath: root + '/app/view_models',
  controllerPath: root + '/app/controllers',
  server: {
    port: 3000
  }
})
