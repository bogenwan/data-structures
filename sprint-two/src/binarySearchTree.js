var BinarySearchTree = function(value) {
  var instanceOf = {};
  instanceOf.value = value;
  instanceOf.count = 1;
  instanceOf.depth = 1;
  instanceOf.left = null;
  instanceOf.right = null;
  for (key in BinaryMethods) {
    instanceOf[key] = BinaryMethods[key];
  }
  return instanceOf;
};

var Node = function(value) {
  var instanceOf = {};
  instanceOf.value = value;
  instanceOf.left = null;
  instanceOf.right = null;
  return instanceOf;
};

var BinaryMethods = {};

//automatically rebalances when tree depth twice necessary depth 
BinaryMethods.insert = function(value) {
  var depth = 1;
  this.count++;
  var inserted = false;
  var curr = this;
  while (!inserted) {
    depth++;
    if (value <= curr.value) {
      if (curr.left === null) {
        curr.left = Node(value);
        inserted = true;
      } else {
        curr = curr.left;
      }
    } else {
      if (curr.right === null) {
        curr.right = Node(value);
        inserted = true;
      } else {
        curr = curr.right;
      }
    }
  }
  this.depth = Math.max(this.depth, depth);
  if (this.depth >= 2 * Math.ceil(Math.log2(this.count + 1))) {
    this.rebalance();
  }
};
/*
Implements Day-Sout-Warren algorithm, use right rotations to convert to a linked
list(called a vine) then apply repeated left rotations to convert to a balanced
binary search tree
*/
BinaryMethods.rebalance = function() {
  var treeToVine = function(top) {
    var tail = top;
    var rest = tail.right;
    while (rest !== null) {
      if (rest.left === null) {
        tail = rest;
        rest = rest.right;
      } else {
        var temp = rest.left;
        rest.left = temp.right;
        temp.right = rest;
        rest = temp;
        tail.right = temp;
      }
    }
  };

  var vineToTree = function(top, count) {
    var numLeaves = count + 1 - Math.pow(2, Math.floor(Math.log2(count + 1)));
    compress(top, numLeaves);
    var size = count - numLeaves;
    console.log('hi', size);
    while (size > 1) {
      compress(top, Math.floor(size / 2));
      size = Math.floor(size / 2);
    }
  };

  var compress = function(top, count) {
    var scanner = top;
    for (var i = 0; i < count; i++) {
      var child = scanner.right;
      scanner.right = child.right;
      scanner = scanner.right;
      child.right = scanner.left;
      scanner.left = child;
    }    
  };
  //because the tree is its own root, immitate it with a node
  var pseudoGrand = Node(0);
  var pseudoRoot = Node(this.value);
  pseudoRoot.left = this.left;
  pseudoRoot.right = this.right;
  pseudoGrand.right = pseudoRoot;

  //make the the tree's 'root' the pseudo root
  treeToVine(pseudoGrand);
  vineToTree(pseudoGrand, this.count);
  this.value = pseudoGrand.right.value;
  this.left = pseudoGrand.right.left;
  this.right = pseudoGrand.right.right;

  this.depth = this._computeDepth();
};

BinaryMethods.contains = function(value) {
  if (this.root === null) {
    return false;
  } else {
    var curr = this;
    while (curr !== null) {
      if (value < curr.value) {
        curr = curr.left;
      } else if (value > curr.value) {
        curr = curr.right;
      } else {
        return true;
      }
    }
    return false;
  }
};

BinaryMethods.depthFirstLog = function(func) {
  var depthFirst = function(node) {
    if (node === null) {
      return null;
    } else {
      func(node.value);
      depthFirst(node.left);
      depthFirst(node.right);
    }
  };
  depthFirst(this);
};
/*
push node values to nested array, [0][i] refers to nodes at depth 1 etc.
then call func
*/
BinaryMethods.breadthFirstLog = function(func) {
  var breadth = [];
  for (var i = 0; i < this.depth; i++) {
    breadth[i] = [];
  }
  var breadthFirst = function(node, depth) {
    if (node === null) {
      return null;
    } else {
      breadth[depth].push(node.value);
      breadthFirst(node.left, depth + 1);
      breadthFirst(node.right, depth + 1);
    }
  };
  breadthFirst(this, 0);
  for (var i = 0; i < breadth.length; i++) {
    for (var j = 0; j < breadth[i].length; j++) {
      func(breadth[i][j]);
    }
  }
};

BinaryMethods._computeDepth = function() {
  var depthRecurse = function(node, count) {
    if (node === null) {
      return count;
    } else {
      return Math.max(depthRecurse(node.left, count + 1), depthRecurse(node.right, count + 1));
    }
  };
  return depthRecurse(this, 0);
};

/*
 * Complexity: What is the time complexity of the above functions?
 * Contains O(n) = lg(n)
 * Insert O(n) = lg(n)
 * depthFirstLog: O(n) = n
 * Rebalance O(n) = n;
 * breadthFirst O(n) = n;
 * _computeDepth O(n) = n
 */
