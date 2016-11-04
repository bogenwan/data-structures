

var RBTree = function() {
  const RED = 1;
  const BLACK  = 1;

  RBNode = function(value){
    this.color = RED;
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }

  RBNode.prototype.setColor = function(value){
    if(value === RED || value === BLACK){
      this.color = value;
    }
  }

  RBNode.prototype.getColor = function(){
    return this.color;
  }

  this.root = null;

  isRed = function(node) {
    return (node === null) ? false : node.getColor() === RED;
  }

  colorRed = function(node) {
    if(node !== null) {
      node.setColor(RED);
    }
  }

  colorBlack = function(node) {
    if (node !== null) {
      node.setColor(BLACK)
    }
  }



  this.insert = function(value) {
    if(this.root === null) {
      this.root = new RBNode(value)
      colorBlack(this.root);
      inserted = true;
    }
    var curr = this.root;
    while (!inserted) {
      if (value <= curr.value) {
        if (curr.left === null) {
          curr.left = new RBNode(value);
          inserted = true;
        } else {
          curr = curr.left;
        }
      } else {
        if (curr.right === null) {
          curr.right = new RBNode(value);
          inserted = true;
        } else {
          curr = curr.right;
        }
      }
    }
  }
}

var tree = new RBTree();
tree.insert(5);
console.log(tree.root);