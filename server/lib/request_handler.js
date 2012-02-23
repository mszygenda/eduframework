require('./router.js');
cm = require('./controller_manager.js');

RequestHandler = function() {
  this.handle = function(service, req, resp) {
    console.log('new request');  

    var urlObj = url.parse(req.url);
    r = new Router(urlObj.pathname);
    Config.routes(r); 

    // Routing error
    if(!r.matchFound) {
      resp.statusCode = 404;
      resp.end();
      return;
    }

    cm.instance().invokeAction(
       r.controller,
       r.action,
       r.variables, 
       req, 
       resp
    ); 
  }
}
