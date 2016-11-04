var nGraph = function() {
};

nGraph.prototype.addPair = function(fromNode, toNode) {
  if (this[toNode] === undefined) {
    this[toNode] = {};
  }
  if (this[fromNode] === undefined) {
    this[fromNode] = {};
  }
  this[fromNode][toNode] = 1;
};

nGraph.prototype.nodeCount = function() {
  var counter = 0;
  for (var key in this) {
    if ((typeof this[key]) === 'function') {
      //do nothing
    } else {
      counter++;
    }
  }
  return counter;
};

nGraph.prototype.DFS = function(callBack, node) {
  if (callBack === undefined || this[node] === undefined) {
    return null;
  }
  var graph = this;
  var visited = {};
  var first = [];
  visited[node] = true;
  first.push(node);
  callBack(node);
  var depthRecurse = function(exploring) {
    if (exploring.length === 0) {
      return null;
    }
    var toExplore = [];
    for (var i = 0; i < exploring.length; i++) {
      for (var toNode in graph[exploring[i]]) {
        if (exploring[toNode] !== true) {
          exploring[toNode] = true;
          callBack(toNode);
          toExplore.push(toNode);
        }
      }
    }
    depthRecurse(toExplore);
  };
};

var graph = new nGraph();

// this line lets you access the file system. You'll learn more about it later in the course
var fs = require('fs');

// read the `adjacency-list` file in this directory (you might have named the file differently) and split it on new lines into an array
var fileLines = fs.readFileSync('./adjacency-list.txt').toString().split('\n');

// you may have to do this 0 or more times, to remove blank lines from fileLines
fileLines.pop();

fileLines.forEach(function(line) {
  var pair = line.split(' ');
  graph.addPair(pair[0], pair[1]);
  console.log(line);

});
