

// Instantiate a new graph
var Graph = function() {
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this[node] = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  if (this[node] === undefined) {
    return false;
  } else {
    return true;
  }
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  if (this.contains(node) === false) {
    return null;
  }
  for (var key in this[node]) {
    delete this[key][node];
  }
  delete this[node];
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  if (this[fromNode] === undefined) {
    return false;
  }
  if (this[fromNode][toNode] !== undefined) {
    return true;
  }
  return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (this[fromNode] !== undefined && this[toNode] !== undefined) {
    this[fromNode][toNode] = 1;
    this[toNode][fromNode] = 1;
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  if (this.hasEdge(fromNode, toNode)) {
    delete this[fromNode][toNode];
    delete this[toNode][fromNode];
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key in this) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 * forEachNode O(n) = n
 * all other functions O(n) = 1 
 */

