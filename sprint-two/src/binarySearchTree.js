var BinarySearchTree = function(value) {
  var instanceOf = {};
  instanceOf.value = value;
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

BinaryMethods.insert = function(value) {
  if (this.root === null) {
    this.root = Node(value);
  } else {
    var inserted = false;
    var curr = this;
    while (!inserted) {
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
  }
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
      return;
    } else {
      func(node.value);
      depthFirst(node.left);
      depthFirst(node.right);
    }
  };
  depthFirst(this);
};


/*
 * Complexity: What is the time complexity of the above functions?
 * Contains O(n) = lg(n)
 * Insert O(n) = lg(n)
 * depthFirstLog: O(n) = n
 */
