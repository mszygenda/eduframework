var fs = require('fs');
var path = require('path');

fs.copyFile = function (src, dest) {
  fs.readFile(src, 'utf-8', function (err, data) {
    fs.writeFile(dest, data);
  })
}

fs.copyDirectory = function (src, dest, recursive) {
  fs.readdir(src, function (err, files) {
    var i, file, stat, srcPath, destPath;

    for (i = 0; i < files.length; i += 1) {
      file = files[i];
      srcPath = src + "/" + file;
      destPath = dest + "/" + file;

      stat = fs.statSync(srcPath)

      if(stat.isDirectory() && recursive) {
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
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Object.prototype.merge = function(another) {
  for(prop in another) {
    this[prop] = another[prop];
  }
}
