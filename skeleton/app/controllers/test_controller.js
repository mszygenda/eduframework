var actions = exports.controller = {};

actions.test = function () {
  this.vars["msgFromController"] = "JS is not that bad";
  this.respond();
};
