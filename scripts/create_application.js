var skeleton = require('../lib/skeleton_builder.js');

var handleBuilderError = function (err) {
    if (err === 'DestinationFolderExists') {
      console.log("Destination folder already exists");      
    } else {
      console.log("Undefined error: " + err.toString());
    }
};

var showSuccessInformation = function () {
  console.log("Application was built successfully");
  console.log("You can execute it by typing ef-start command in application directory");
};

var buildApplication = function () {
  parameters = parseParameters(process.argv);
  builder = skeleton.createSkeletonBuilder(parameters.appName);
  try {
    builder.createApplication();
    showSuccessInformation(); 
  }
  catch (err) {
    handleBuilderError(err);
  }
};

var parseParameters = function (argv) {
  params = {
    appName: argv[2]
  };

  return params;
};

buildApplication();
