var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    if (list.head === null) {
      var tmp = new Node(value);
      list.head = tmp;
      list.tail = tmp;
    } else {
      list.tail.next = new Node(value);
      list.tail = list.tail.next;
    }
  };

  list.removeHead = function() {
    if (list.head === null) {
      return;
    } else {
      var tmp = list.head.value;
      list.head = list.head.next;
      if (list.head === null) {
        list.tail = null;
      }
      return tmp;
    }
  };

  list.contains = function(target) {
    var curr = list.head;
    while (curr != null) {
      if (curr.value === target) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * contains O(n) === n
 * addToTail O(n) === 1
 * removeHead O(n) === 1
 */
