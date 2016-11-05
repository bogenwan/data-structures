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

nGraph.prototype.DFS = function(callback, node, visitMem) {
  if (callback === undefined || this[node] === undefined) {
    return null;
  }
  var graph = this;
  var visited = ((typeof visitMem) === 'object' && visitMem !== null) ? visitMem : {};
  var first = [];
  visited[node] = true;
  first.push(node);
  callback(node);
  var depthRecurse = function(exploring) {
    if (exploring.length === 0) {
      return null;
    }
    var toExplore = [];
    for (var i = 0; i < exploring.length; i++) {
      for (var toNode in graph[exploring[i]]) {
        if (visited[toNode] !== true) {
          visited[toNode] = true;
          callback(toNode);
          toExplore.push(toNode);
        }
      }
    }
    depthRecurse(toExplore);
  };
  depthRecurse(node);
};

var Kosaraju = function(graph, reverseGraph) {
  var list = [];
  var visited = {};
  var mklist = function(key) {
    list.push(key);
  };
  for (var node in graph) {
    if ((typeof graph[node]) !== 'function' && visited[node] === undefined) {
      graph.DFS(mklist, node, visited);
    }
  }
  visited = {};
  for (node in reverseGraph) {
    if ((typeof graph[node]) !== 'function' && visited[node] === undefined) {
      var component = [];
      var mkcomponent = function(key) {
        component.push(key);
      };
      reverseGraph.DFS(mkcomponent, node, visited);
      console.log(component);
    }
  }
};

var graph = new nGraph();
var reverseGraph = new nGraph();

// this line lets you access the file system. You'll learn more about it later in the course
var fs = require('fs');

// read the `adjacency-list` file in this directory (you might have named the file differently) and split it on new lines into an array
var fileLines = fs.readFileSync('./adjacency-list.txt').toString().split('\n');

// you may have to do this 0 or more times, to remove blank lines from fileLines
fileLines.pop();

fileLines.forEach(function(line) {
  var pair = line.split(' ');
  graph.addPair(pair[0], pair[1]);
  reverseGraph.addPair(pair[1], pair[0]);
});

var arr = [];
var func = function(a) { arr.push(a); };
Kosaraju(graph, reverseGraph);




