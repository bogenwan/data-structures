var Stack = function() {
  this.height = 0;
};

Stack.prototype.size = function() {
  return this.height;
};

Stack.prototype.push = function(value) {
  this[this.height] = value;
  this.height++;
};

Stack.prototype.pop = function() {
  if (this.size() > 0) {
    var tmp = this[this.height - 1];
    this[this.height - 1] = undefined;
    this.height--;
    return tmp;
  } else {
    return;
  }
};


