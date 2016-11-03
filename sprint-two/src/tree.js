var Tree = function(value) {
  var newTree = {};
  newTree.value = value;

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



/*
 * Complexity: What is the time complexity of the above functions?
 *
 * contains O(n) = n
 * addChild O(n) = 1
 */
