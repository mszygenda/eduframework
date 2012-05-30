/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var Core = require('../core.js'),
    RequestHandler = {};

RequestHandler.handle = function (service, req, resp) {
  Core.ControllerEngine.manager.createControllerAndInvokeActions(
    req,
    resp
  );
};

exports.createRequestHandler = function () {
  var obj = Object.create(RequestHandler);

  return obj;
};
