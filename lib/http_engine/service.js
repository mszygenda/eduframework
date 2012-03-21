// require section
var http = require('http');

// Class declaration
var Service = function () { }
sys.inherits(Service, events.EventEmitter);

// Starts application server
Service.prototype.start = function () {
   var self, httpServer;

   self = this;
   httpServer = http.createServer(function (req, resp) {
     var requestHandler = Core.HttpEngine.createRequestHandler();
     requestHandler.handle(self, req, resp);
   })

   httpServer.listen(this.port);
   this.emit('start');
} 

// Stops application server
Service.prototype.stop = function () {
   this.emit('stop');
}

//
// Exposed public api
// 

// Service class factory method. Used to instantiate Service objects
//
// port - Port to listen on
exports.createService = function (port) {
  var object = Object.create(Service.prototype);
  object.port = port || 3000;
  
  return object;
}
