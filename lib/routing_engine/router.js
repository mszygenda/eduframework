// Class declaration

// Class used to route requests to different controllers by examining url
var Router = function () { }

// Transforms pattern which may be not proper regular expression into more valid form
//
// pattern - pattern to fix
Router.prototype.transformPattern = function(pattern) {
  if(pattern.charAt(0) != '^') {
    pattern = "^" + pattern;
  }
  if(pattern.charAt(pattern.length - 1) != '$') {
    pattern = pattern + '$';
  }

  return pattern;
}

// Extracts variables from url using given pattern
//
// pattern - pattern which contains definition of all url-variables
// path - url
Router.prototype.extractVariables = function(pattern, path)
{
  var variables = new Object();
  var i = 1; 

  // Extract variables
  varRegexp = new RegExp('(:[a-z]+)', 'g');
  valuesRegexp = new RegExp(pattern.replace(varRegexp, '(\\w+)'), 'g');

  values = valuesRegexp.exec(path);

  while(name = varRegexp.exec(pattern))
  {
    var name = name[1].substr(1);
    variables[name] = i < values.length ? values[i] : null
    i++;
  }

  return variables;
}

// Method used to create rule
//
// pattern - url pattern
// destination - controller url in format (controller#action)
Router.prototype.match = function(pattern, destination) {
  var valuePattern, pattern, targetRegexp, target;

  // Path was already matched, quit then
  if(this.matchFound)
  {
     return false;  
  }

  pattern = this.transformPattern(pattern);

  valuePattern = pattern.replace(new RegExp('(:[a-z]+)', 'g'), '(\\w+)');
  regexp = new RegExp(valuePattern, '');
  
  // If current pattern doesn't match path return false
  if(!regexp.test(this.path))
  {
    return false;
  }

  this.variables = this.extractVariables(pattern, this.path);

  targetRegexp = new RegExp('(\\w+)#(\\w+)', ''); 
  target = targetRegexp.exec(destination);

  this.controller = target[1];
  this.action = target[2];

  return this.matchFound = true;
}

// It should provide routing rules for specified path
Router.prototype.route = function(routes) {
  routes(this);
}

///
/// Exposed public api
///

// Router factory. Creates router for specified url
//
// pathname - url to match
exports.createRouter = function(pathname) { 
  object = Object.create(Router.prototype);

  object.defaultRouteHandler = Core.ControllerEngine.manager;
  object.matchFound = false;
  object.path = pathname;
  object.variables = new Array();

  object.controller = '';
  object.action = '';

  return object;
}

exports.Router = Router
