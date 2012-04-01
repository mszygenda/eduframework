var sys, events, ResponseRenderer, createRenderer;

sys = require('sys');
events = require('events');

// Memory Renderer class
ResponseRenderer = Object.create(events.EventEmitter.prototype);

// Creates instance of in-memory renderer
createRenderer = function (resp) {
  var obj = Object.create(ResponseRenderer);
  obj.out = resp;
  obj.data = '';

  obj.out.on('end', function (chunk) {
    console.log('response end');
    obj.emit('end', obj);
  });

  return obj;
}

//
// Exposed public api
//

exports.createRenderer = createRenderer;
