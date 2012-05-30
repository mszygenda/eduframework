/*jslint node: true, sloppy: true, indent: 2 */
/*global require: false, exports: false */

var url = require('url'),
    Core = require('../core.js'),
    Router = {}, 
    extractPathFromRequest;

// Router class
// Used to route requests to different controllers by examining url;

// Transforms pattern which may be not proper regular expression into more valid form;
//
// pattern - pattern to fix;
Router.transformPattern = function (pattern) {
  if (pattern.charAt(0) !== '^') {
    pattern = "^" + pattern;
  }
  if (pattern.charAt(pattern.length - 1) !== '$') {
    pattern = pattern + '$';
  }

  return pattern;
};

// Extracts variables from url using given pattern;
//
// pattern - pattern which contains definition of all url-variables;
// path - url;
Router.extractVariables = function (pattern, path) {
  var name, i = 1, variables, varRegexp, valuesRegexp, values;

  variables = {};

  // Extract variables;
  varRegexp = /(:[a-z]+)/g;
  valuesRegexp = new RegExp(pattern.replace(varRegexp, '(.+)'), 'g');

  values = valuesRegexp.exec(path);

  name = varRegexp.exec(pattern);
  while (name) {
    name = name[1].substr(1);
    variables[name] = i < values.length ? values[i] : null;
    i += 1;

    name = varRegexp.exec(pattern);
  }

  return variables;
};

// Method used to create rule;
//
// pattern - url pattern;
// destination - controller url in format (controller#action);
Router.match = function (pattern, destination) {
  var valuePattern, targetRegexp, target, regexp;

  // Path was already matched, quit then;
  if (this.matchFound) {
    return false;
  }

  pattern = this.transformPattern(pattern);

  valuePattern = pattern.replace(/(:[a-z]+)/g, '(.+)');
  regexp = new RegExp(valuePattern, '');

  // If current pattern doesn't match path return false;
  if (!regexp.test(this.path)) {
    return false;
  }

  this.variables = this.extractVariables(pattern, this.path);

  targetRegexp = new RegExp('(\\w+)#(\\w+)', '');
  target = targetRegexp.exec(destination);

  this.controller = target[1];
  this.action = target[2];

  this.matchFound = true;

  return true;
};

// It should provide routing rules for specified path;
Router.route = function (routes) {
  routes(this);
};

extractPathFromRequest = function (req) {
  var urlObj = url.parse(req.url, true);

  return urlObj.pathname;
};

///
/// Exposed public api;
///

// Router factory. Creates router for specified url;
//
// pathname - url to match;
exports.createRouter = function (req) {
  var object = Object.create(Router);

  object.defaultRouteHandler = Core.ControllerEngine.manager;
  object.matchFound = false;
  object.path = extractPathFromRequest(req);
  object.variables = [];

  object.controller = '';
  object.action = '';

  return object;
};

exports.Router = Router;
