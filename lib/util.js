String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

Object.prototype.merge = function(another) {
  for(prop in another) {
    this[prop] = another[prop];
  }
}
