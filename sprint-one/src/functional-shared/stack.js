var Stack = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
};

var stackMethods = {};

stackMethods.size = function() {
  return this.height;
};

stackMethods.push = function(value) {
  this[this.height] = value;
  this.height++;
};

stackMethods.pop = function() {
  if (this.height() > 0) {
    var tmp = this[this.height - 1];
    this[this.height - 1] = undefined;
    this.height--;
    return tmp;
  } else {
    return;
  }
};


