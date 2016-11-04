var Queue = function() {
  var someInstance = Object.create(queueMethods);
  someInstance.min = 0;
  someInstance.max = 0;
  return someInstance;
};

var queueMethods = {};
queueMethods.size = function() {
  return this.max - this.min;
};

queueMethods.enqueue = function(value) {
  this[this.max] = value;
  this.max++;
};

queueMethods.dequeue = function() {
  if (this.size() > 0) {
    var tmp = this[this.min];
    this[this.min] = undefined;
    this.min++;
    return tmp;
  } else {
    return;
  }
};
