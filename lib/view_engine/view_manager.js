/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var fs = require('fs');
var Core = require('../core.js');
var View = require('./view.js');

var ViewManager = {};

ViewManager.determineLayoutView = function (req, resp) {
  var name = 'layouts/default',
      format = 'html',
      view = View.createView(name, format);
  
  console.log('Layout view file determined: ' + view.toString());

  return view;
};

ViewManager.determineView = function (req, resp) {
  var name = req.controller + "/" + req.action, 
      format = 'html',
      view = View.createView(name, format);

  console.log('View file determined: ' + view.toString());

  return view;
};

exports.ViewManager = ViewManager;
