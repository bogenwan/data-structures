var Tree = function(value) {
  var newTree = {};
  newTree.value = value;
  newTree.parent = null;
  // your code here
  newTree.children = [];  // fix me
  for (var key in treeMethods) {
    newTree[key] = treeMethods[key];
  }

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(Tree(value));
  this.children[this.children.length - 1].parent = this;
};

treeMethods.contains = function(target) {
  for (var i = 0; i < this.children.length; i++) {
    if (this.children[i].value === target) {
      return true;
    } else {
      if (this.children[i].contains(target)) {
        return true;
      }
    }
  }
  return false;
};

treeMethods.traverse = function(func) {
  var depthFirst = function(node) {
    func(node.value);
    for (var i = 0; i < node.children.length; i++) {
      depthFirst(node.children[i]);
    }
  };
  depthFirst(this);
};

treeMethods.removeFromParent = function(target) {
  var parent = target.parent;
  if (parent === null) {
    return;
  } else {
    var tmp = [];
    for (var i = 0; i < parent.children.length; i++) {
      if (parent.children[i] !== target) {
        tmp.push(parent.children[i]);
      }
    }
    parent.children = tmp;
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 *
 * contains O(n) = n
 * addChild O(n) = 1
 * traverse O(n) = n
 * removeFromParent O(n) = b where b is the maximum branching factor of the tree
 */
