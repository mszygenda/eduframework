/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false, console: false */

var Core = require('../core.js');
var Utils = {};

// Loads ViewModel class for given action
//
// controller - controller name
// action - action name
Utils.loadViewModel = function (controller, action) {
  var ViewModelClass, vmFile;

  vmFile = Core.Config.core.viewModelPath + '/' + controller + '/' + action + '.js';
  console.log(vmFile);
  try {
    ViewModelClass = require(vmFile).viewModel;  
    if (typeof ViewModelClass === 'function') {
      return new ViewModelClass();
    }

    return Object.create(ViewModelClass);
  } 
  catch (e) {
    return {};
  }
};

// 
// Exposed public api
// 

exports.Utils = Utils;
