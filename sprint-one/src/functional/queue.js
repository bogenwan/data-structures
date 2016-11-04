var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var min = 0;
  var max = 1;
  // Implement the methods below

  someInstance.enqueue = function(value) {
    someInstance[max - 1] = value;
    max++;
  };

  someInstance.dequeue = function() {
    if (someInstance.size() > 0) {
      var tmp = someInstance[min];
      someInstance[tmp] = undefined;
      min++;
      return tmp;
    } else {
      return;
    }
  };

  someInstance.size = function() { // size is the difference between max and min
    return max - min - 1;
  };

  return someInstance;
};
