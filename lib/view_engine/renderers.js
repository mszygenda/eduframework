/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var memoryRenderer, responseRenderer;
memoryRenderer = require('./renderers/memory_renderer.js');
responseRenderer = require('./renderers/response_renderer.js');

exports.MemoryRenderer = memoryRenderer;
exports.ResponseRenderer = responseRenderer;
