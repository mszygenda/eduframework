require('./core.js');
require('./request_handler.js');

Service = function() {
 var self = this;

 this.port = 3000

 this.start = function() {
   var httpServer = http.createServer(function(req, resp) {
     var requestHandler = new RequestHandler();
     requestHandler.handle(self, req, resp);
   })

   httpServer.listen(this.port);
   this.emit('start');
 } 

 this.stop = function() {
   this.emit('stop');
 }
}

sys.inherits(Service, events.EventEmitter);
