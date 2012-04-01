var Utils = {};

// Loads ViewModel class for given action
//
// controller - controller name
// action - action name
Utils.loadViewModel = function (controller, action) {
  var viewModelClass, vmFile;

  vmFile = Core.Config.core.viewModelPath + '/' + controller + '/' + action + '.js';
  console.log(vmFile);
  try {
    viewModelClass = require(vmFile).viewModel;  
    if (typeof viewModelClass === 'function') {
      return new viewModelClass();
    }

    return Object.create(viewModelClass);
  } 
  catch(e) {
    return {};
  }
}

// 
// Exposed public api
// 

exports.Utils = Utils;
