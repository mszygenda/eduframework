// Class declaration

// It provides data needed by view engine required to render response
var ViewContext = function () { }

//
// Exposed public api
//

// ViewContext class factory method. Instantiates empty ViewContext object
exports.createViewContext = function () {
  var object = Object.create(ViewContext.prototype);
  object.request = null
  object.response = null
  object.controller = null
  object.action = null
  object.viewModel = null

  return object;
}
