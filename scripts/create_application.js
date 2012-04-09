var skeleton = require('../lib/skeleton_builder.js');

var buildApplication = function () {
  parameters = parseParameters(process.argv);
  builder = skeleton.createSkeletonBuilder(parameters.appName);
  builder.createApplication();
}

var parseParameters = function (argv) {
  params = {
    appName: argv[2]
  };

  return params;
}

buildApplication();
