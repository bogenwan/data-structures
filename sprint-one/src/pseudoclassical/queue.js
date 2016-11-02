var Queue = function() {
  this.min = 0;
  this.max = 0;
};

Queue.prototype.size = function() {
  return this.max - this.min;
};

Queue.prototype.dequeue = function() {
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
Queue.prototype.enqueue = function(value) {
  this[this.max] = value;
  this.max++;
};
