/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false, console: false */

var url = require('url'),
    Core = require('../core.js'),
    RequestHandler = {};

RequestHandler.handle = function (service, req, resp) {
  var urlObj, router;

  router = Core.RoutingEngine.createRouter(req);
  Core.Config.routes.routes(router);

  // Routing error;
  if (!router.matchFound) {
    Core.logger.error("No matching route found for " + req.url);
    resp.statusCode = 404;
    resp.end();
    return;
  }

  RequestHandler.extendRequest(req, router);

  service.emit('route-found', service, req, resp);
};

RequestHandler.extendRequest = function (req, router) {
  req.variables.merge(router.variables);
  req.controller = router.controller;
  req.action = router.action;
};

exports.createRequestHandler = function () {
  var obj = Object.create(RequestHandler); 
  
  return obj;
};
