var root = EduFramework.applicationPath;

exports.merge({
  rootPath: root,
  viewsPath: root + '/app/views',
  viewModelsPath: root + '/app/view_models',
  controllerPath: root + '/app/controllers',
  server: {
    port: 3000
  }
})
