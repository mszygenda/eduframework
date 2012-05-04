var root = EduFramework.applicationPath;

exports.config = {
  rootPath: root,
  viewsPath: root + '/app/views',
  viewModelsPath: root + '/app/view_models',
  controllerPath: root + '/app/controllers',
  logsPath: root + '/logs',

  server: {
    port: 3000
  },

  modules: [ 
    'ef-mustache'
  ]
};
