var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage[item] = true;
};

setPrototype.contains = function(item) {
  if (this._storage[item] === true) {
    return true;
  }
  return false;
};

setPrototype.remove = function(item) {
  this._storage[item] = undefined;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * Everything is O(n) = 1
 */
