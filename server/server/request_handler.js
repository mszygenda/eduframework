require('./router.js');

RequestHandler = function() {
  this.handle = function(service, req, resp) {
    console.log('new request');  
    var urlObj = url.parse(req.url);
    resp.end(urlObj.pathname);

    r = new Router(urlObj.pathname);
    Config.routes(r); 
  }
}
