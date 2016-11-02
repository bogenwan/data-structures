var Stack = function() {
  var someInstance = Object.create(stackMethods);
  someInstance.height = 0;
  return someInstance;
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
  if (this.size() > 0) {
    var tmp = this[this.height - 1];
    this[this.height - 1] = undefined;
    this.height--;
    return tmp;
  } else {
    return;
  }
};
