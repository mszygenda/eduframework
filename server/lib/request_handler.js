require('./router.js');
cm = require('./controller_manager.js');

RequestHandler = function() {
  this.handle = function(service, req, resp) {
    console.log('new request');  

    var urlObj = url.parse(req.url);
    r = new Router(urlObj.pathname);
    Config.routes(r); 

    cm.instance().invokeAction(
       r.controller,
       r.action,
       r.variables, 
       req, 
       resp
    ); 
  }
}
