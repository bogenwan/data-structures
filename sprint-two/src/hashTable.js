var HashTable = function() {
  this._limit = 8;
  this._count = 0;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    bucket = {};
    bucket[k] = v;
    this._storage.set(index, bucket);
  } else {
    bucket[k] = v;
    this._storage.set(index, bucket);
  }
  this._count++;
  if (this._count > (0.75 * this._limit)) {
    this.double();
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    return null;
  } else {
    return bucket[k];
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  if (bucket === undefined) {
    return null;
  } else {
    delete bucket[k];
    this._count--;
    if (this._count < (0.25 * this._limit)) {
      this.halve();
    }
  }
};

HashTable.prototype.double = function() {
  var holder = [];
  for (var i = 0; i < this._limit; i++) {
    var temp = this._storage.get(i);
    if (temp !== undefined) {
      holder.push(temp);
    }
  }
  this._limit *= 2;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
  for (var i = 0; i < holder.length; i++) {
    for (var key in holder[i]) {
      this.insert(key, holder[i][key]);
    }
  }
};

HashTable.prototype.halve = function() {
  if (this._limit <= 8) {
    return null;
  }
  var holder = [];
  for (var i = 0; i < this._limit; i++) {
    var temp = this._storage.get(i);
    if (temp !== undefined) {
      holder.push(temp);
    }
  }
  this._limit /= 2;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
  for (var i = 0; i < holder.length; i++) {
    for (var key in holder[i]) {
      this.insert(key, holder[i][key]);
    }
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */


