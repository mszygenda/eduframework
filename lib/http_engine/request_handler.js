var RequestHandler = {};

// Handles http request
//
// Passes execution to routing engine
//
// service - Service object
// req - Http request object
// resp - Http response object
RequestHandler.handle = function (service, req, resp) {
  var urlObj, params, r;

  console.log('new request');  

  urlObj = url.parse(req.url, true);
  r = Core.RoutingEngine.createRouter(urlObj.pathname);
  Core.Config.routes(r); 

  // Routing error
  if (!r.matchFound) {
    resp.statusCode = 404;
    resp.end();
    return;
  }

  params = urlObj.query ? urlObj.query : {};
  params.merge(r.variables);

  Core.ControllerEngine.manager.invokeAction(
     r.controller,
     r.action,
     params, 
     req, 
     resp
  ); 
}

//
// Exposed public api
// 

// RequestHandler class factory method. Used to instantiate RequestHandler objects
exports.createRequestHandler = function () {
  var object = Object.create(RequestHandler);
  return object; 
}
