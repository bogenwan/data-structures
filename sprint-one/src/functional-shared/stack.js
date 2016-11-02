var Stack = function() {
  var instanceOf = {};
  instanceOf.height = 0;
  for (key in stackMethods) {
    instanceOf[key] = stackMethods[key];
  }
  return instanceOf;
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


