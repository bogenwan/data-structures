

var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[index] === undefined) {
    this._storage[index] = {};
    this._storage[index][k] = v;
  } else {
    this._storage[index][k] = v;
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[index] === undefined) {
    return;
  } else {
    return this._storage[index][k];
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage[index] === undefined) {
    return;
  } else {
    this._storage[index][k] = undefined;
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */


