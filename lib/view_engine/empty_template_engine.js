/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var EmptyTemplateEngine = {};

EmptyTemplateEngine.render = function (view, output, success) {
  this.renderErrorMessage(output);
  success(view);
};

EmptyTemplateEngine.renderErrorMessage = function (output) {
  output.write('eduFramework\n');
  output.write('No template engine found for this format!\n');
  output.write("I can't render response without template engine!\n");
  output.write("Please install ef-mustache for example\n");
  output.end();
};

exports.EmptyTemplateEngine = EmptyTemplateEngine;
