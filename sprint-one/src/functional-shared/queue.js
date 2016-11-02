var Queue = function() {
  var someInstace = {};
  someInstace.min = 0;
  someInstace.max = 0;
  for (key in queueMethods) {
    someInstace[key] = queueMethods[key]; 
  }
  return someInstace;
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
    console.log(this.min);
    var tmp = this[this.min];
    this[this.min] = undefined;
    this.min++;
    return tmp;
  } else {
    return;
  }
};


