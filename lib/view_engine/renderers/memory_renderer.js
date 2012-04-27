/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var sys, events, MemoryStream, MemoryRenderer, MemoryRendererPrivate, createRenderer;

MemoryStream = require('memorystream');
sys = require('sys');
events = require('events');

// Memory Renderer class;
MemoryRenderer = Object.create(events.EventEmitter.prototype);
// Memory Renderer private methods;
MemoryRendererPrivate = {};

MemoryRendererPrivate.dataHandler = function (chunk) {
  this.data += chunk.toString();
};

// Creates instance of in-memory renderer;
createRenderer = function () {
  var obj = Object.create(MemoryRenderer);
  obj.out = new MemoryStream();
  obj.data = '';

  obj.out.on('data', function (chunk) {
    MemoryRendererPrivate.dataHandler.call(obj, chunk);
  });

  obj.out.on('end', function () {
    obj.emit('end', obj);
  });

  return obj;
};

//
// Exposed public api;
//

exports.createRenderer = createRenderer;
