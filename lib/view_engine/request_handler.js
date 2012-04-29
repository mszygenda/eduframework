/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../core.js');
var RequestHandler = {};

RequestHandler.handle = function (service, req, resp) {
  var viewContext = Core.ViewEngine.createViewContext(req, resp);

  Core.ViewEngine.render(viewContext);
};

exports.createRequestHandler = function () {
  return Object.create(RequestHandler); 
};
