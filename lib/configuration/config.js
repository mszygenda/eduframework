// Global application object which stores configuration
var Config = {
  routes: function() {
    throw new Exception("No routes defined");
  },
  views: {},
  core: {}
}

//
// Exposed public api
//

exports.Config = Config
