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

nGraph.prototype.BFS = function(callback, node, visitMem) {
  if (callback === undefined || this[node] === undefined) {
    return null;
  }
  var graph = this;
  var visited = ((typeof visitMem) === 'object' && visitMem !== null) ? visitMem : {};
  var first = [];
  visited[node] = true;
  first.push(node);
  callback(node);
  var breadthRecurse = function(exploring) {
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
    breadthRecurse(toExplore);
  };
  breadthRecurse(node);
};

nGraph.prototype.DFS = function(callback, node, visitMem) {
  if (callback === undefined || this[node] === undefined) {
    return null;
  }
  var graph = this;
  var visited = ((typeof visitMem) === 'object' && visitMem !== null) ? visitMem : {};
  var stack = [];
  stack.push(node);
  while (stack.length > 0) {
    var curr = stack.pop();
    if (visited[curr] === undefined) {
      visited[curr] = true;
      callback(curr);
      for (var toVisit in graph[curr]) {
        if (visited[toVisit] === undefined) { 
          stack.push(toVisit);
        }
      }
    }
  }
};

var Kosaraju = function(graph, reverseGraph) {
  var list = [];
  var visited = {};
  var count = 0;
  var reverseCount = 0;
  var mklist = function(key) {
    list.push(key);
    count++;
  };
  for (var node in graph) {
    if ((typeof graph[node]) !== 'function' && visited[node] === undefined) {
      graph.DFS(mklist, node, visited);
    }
  }
  visited = {};
  while (list.length > 0) {
    node = list.shift();
    if (visited[node] === undefined) {
      var component = [];
      var mkcomponent = function(key) {
        component.push(key);
        reverseCount++;
      };
      reverseGraph.DFS(mkcomponent, node, visited);
      if (component.length > 1) {
        console.log(component.length);
      }        
    }
  }
  console.log('graph', count);
  console.log('reverseGraph', reverseCount);
};

var graph = new nGraph();
var reverseGraph = new nGraph();

// this line lets you access the file system. You'll learn more about it later in the course
var fs = require('fs');

// read the `adjacency-list` file in this directory (you might have named the file differently) and split it on new lines into an array
var fileLines = fs.readFileSync('./twitter_combined.txt').toString().split('\n');

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
graph.DFS(func, '0');
console.log(arr);




