var RequestHandler = function() {
  this.handle = function(service, req, resp) {
    console.log('new request');  

    var urlObj = url.parse(req.url, true);
    r = new Core.RoutingEngine.Router(urlObj.pathname);
    Core.Config.routes(r); 

    // Routing error
    if(!r.matchFound) {
      resp.statusCode = 404;
      resp.end();
      return;
    }

    var params = urlObj.query ? urlObj.query : {};
    params.merge(r.variables);

    Core.ControllerEngine.manager.invokeAction(
       r.controller,
       r.action,
       params, 
       req, 
       resp
    ); 
  }
}

exports.RequestHandler = RequestHandler
