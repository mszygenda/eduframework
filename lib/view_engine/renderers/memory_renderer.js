var ms, sys, events, MemoryRenderer, MemoryRendererPrivate, createRenderer;

ms = require('memorystream');
sys = require('sys');
events = require('events');

// Memory Renderer class
MemoryRenderer = Object.create(events.EventEmitter.prototype);
// Memory Renderer private methods
MemoryRendererPrivate = {};


MemoryRendererPrivate.dataHandler = function (chunk) {
  this.data += chunk.toString();
}

// Creates instance of in-memory renderer
createRenderer = function () {
  var obj = Object.create(MemoryRenderer);
  obj.out = new ms();
  obj.data = '';

  obj.out.on('data', function (chunk) {
    MemoryRendererPrivate.dataHandler.call(obj, chunk); 
  });

  obj.out.on('end', function () {
    obj.emit('end', obj);
  });

  return obj;
}

//
// Exposed public api
//

exports.createRenderer = createRenderer;
