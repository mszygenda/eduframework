/*jslint node: true, sloppy: true, vars: true, indent: 2 */
/*global require: false, exports: false */

var fs = require('fs'),
    path = require('path');

fs.copyFile = function (src, dest) {
  fs.readFile(src, 'utf-8', function (err, data) {
    fs.writeFile(dest, data);
  });
};

fs.copyDirectory = function (src, dest, recursive) {
  fs.readdir(src, function (err, files) {
    var i, file, stat, srcPath, destPath;

    for (i = 0; i < files.length; i += 1) {
      file = files[i];
      srcPath = src + "/" + file;
      destPath = dest + "/" + file;

      stat = fs.statSync(srcPath);

      if (stat.isDirectory() && recursive) {
        if (!path.existsSync(destPath)) {
          fs.mkdirSync(destPath);
        }

        fs.copyDirectory(srcPath, destPath, true);
      }
      else if (stat.isFile()) {
        fs.copyFile(srcPath, destPath);
      }
    }
  });
};

String.prototype.classCamelize = function () {
  return this.camelize().capitalize();
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.camelize = function () {
  var underscoreRegexp = /(_[a-z])/g;
  return this.replace(underscoreRegexp, function (letter) {
    return letter.slice(1).toUpperCase();
  });
};

Object.prototype.merge = function (another) {
  var prop = null;

  for (prop in another) {
    if (another.hasOwnProperty(prop)) {
      this[prop] = another[prop];
    }
  }
};

Object.prototype.toArray = function () {
  var prop = null, array = [];

  if (this.prototype === Array) {
    return this;
  }

  for (prop in this) {
    if (typeof this[prop] !== 'function') {
      array.push(this[prop]);
    }
  }

  return array;
};
