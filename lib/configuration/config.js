/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

// Global application object which stores configuration;
var Config = {
  routes: function () {
    throw "No routes defined";
  },
  views: {},
  core: {}
};

//
// Exposed public api;
//

exports.Config = Config;
