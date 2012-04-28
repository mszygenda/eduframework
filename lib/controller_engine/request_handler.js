/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js');

var RequestHandler = {};

RequestHandler.handle = function (service, req, resp) {
  Core.ControllerEngine.manager.invokeAction(
     req.controller,
     req.action,
     req.variables,
     req,
     resp
  );
};

exports.createRequestHandler = function () {
  var obj = Object.create(RequestHandler);

  return obj;
};
