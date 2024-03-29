/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var url = require('url'),
    Core = require('../core.js'),
    RequestHandler = {};

// Handles http request;
//
// Passes execution to routing engine;
//
// service - Service object;
// req - Http request object;
// resp - Http response object;
RequestHandler.handle = function (service, req, resp) {
  var urlObj;

  Core.logger.info('new request');

  urlObj = url.parse(req.url, true);
  req.variables = urlObj.query ? urlObj.query : {};
  req.variables.merge(req.body);

  service.emit('new-request', service, req, resp);
};

//
// Exposed public api;
//

// RequestHandler class factory method. Used to instantiate RequestHandler objects;
exports.createRequestHandler = function () {
  var object = Object.create(RequestHandler);
  return object;
};
