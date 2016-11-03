var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = {};
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  this._storage[JSON.stringify(item)] = item;
};

setPrototype.contains = function(item) {
  if (this._storage[JSON.stringify(item)] !== undefined) {
    return true;
  }
  return false;
};

setPrototype.remove = function(item) {
  this._storage[JSON.stringify(item)] = undefined;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * Everything is O(n) = 1
 */
