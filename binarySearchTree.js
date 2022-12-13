class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    // remove duplicate values and sort an array
    const sortedArr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArr);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const node = new Node(array[mid]);
    node.left = this.buildTree(array.slice(0, mid));
    node.right = this.buildTree(array.slice(mid + 1));
    return node;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return new Node(value);
    if (currentNode.value === value) return;

    if (currentNode.value < value) {
      currentNode.right = this.insert(value, currentNode.right);
    } else if (currentNode.value > value) {
      currentNode.left = this.insert(value, currentNode.left);
    }

    return currentNode;
  }

  delete(value) {
    this.root = this.deleteNode(value, this.root);
  }

  deleteNode(value, currentNode) {
    if (currentNode === null) return currentNode;

    if (value === currentNode.value) {
      if (currentNode.right === null && currentNode.left === null) {
        return null;
      } else if (currentNode.left === null) {
        return currentNode.rightl;
      } else if (currentNode.right === null) {
        return currentNode.left;
      } else {
        let tempNode = this._getSmallestNode(currentNode);
        currentNode.value = tempNode.value;
        currentNode.right = this.deleteNode(currentNode.right, tempNode.value);
      }
    } else if (value < currentNode.value) {
      currentNode.left = this.deleteNode(value, currentNode.left);
      return currentNode;
    } else if (value > currentNode.value) {
      currentNode.right = this.deleteNode(value, currentNode.right);
      return currentNode;
    }
  }

  find(value, currentNode = this.root) {
    if (currentNode === null || currentNode.value === value) return currentNode;

    if (value > currentNode.value) {
      return this.find(value, currentNode.right);
    } else {
      return this.find(value, currentNode.left);
    }
  }

  levelOrder(callback) {
    const queue = [this.root];
    const list = [];
    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (callback) {
        callback(currentNode);
      } else {
        list.push(currentNode.value);
      }

      const enqueue = [currentNode.left, currentNode.right].filter(
        (value) => value
      );
      queue.push(...enqueue);
    }
    if (list.length > 0) return list;
  }

  inorder(callback, node = this.root, list = []) {
    if (node === null) return;

    this.inorder(callback, node.left, list);
    callback ? callback(node) : list.push(node.value);
    this.inorder(callback, node.right, list);

    if (list.length > 0) return list;
  }
  postorder(callback, node = this.root, list = []) {
    if (node === null) return;

    this.postorder(callback, node.left, list);
    this.postorder(callback, node.right, list);
    callback ? callback(node) : list.push(node.value);

    if (list.length > 0) return list;
  }
  preorder(callback, node = this.root, list = []) {
    if (node === null) return;

    callback ? callback(node) : list.push(node.value);
    this.preorder(callback, node.left, list);
    this.preorder(callback, node.right, list);

    if (list.length > 0) return list;
  }

  height(node = this.root) {
    if (node == null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, current = this.root, count = 0) {
    if (node === null) return;
    if (node.value === current.value) return count;

    if (current.value < node.value) {
      return this.depth(node, current.rigth, count + 1);
    } else {
      return this.depth(node, current.left, count + 1);
    }
  }

  isBalanced() {
    return this._testBalance() !== -1;
  }

  _testBalance(node = this.root) {
    if (node === null) return 0;

    const leftBalance = this._testBalance(node.left);
    const rightBalance = this._testBalance(node.right);
    const difference = Math.abs(leftBalance - rightBalance);

    if (leftBalance === -1 || rightBalance === -1 || difference > 1) {
      return -1;
    } else {
      return Math.max(leftBalance, rightBalance) + 1;
    }
  }

  rebalance() {
    const inorderList = this.inorder();
    this.root = this.buildTree(inorderList);
  }

  _getSmallestNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
}

function randomNumArr(length) {
  const arr = [];

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * 1000);
    arr.push(randomNum);
  }

  return arr;
}

const testArray = randomNumArr(42);
console.log(testArray);

const binaryTree = new Tree(testArray);
console.log(binaryTree.isBalanced());
console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
console.log(binaryTree.inorder());

binaryTree.insert(236);
binaryTree.insert(102);
binaryTree.insert(327);
binaryTree.insert(869);
binaryTree.insert(324);
binaryTree.insert(777);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());

console.log(binaryTree.levelOrder());
console.log(binaryTree.preorder());
console.log(binaryTree.postorder());
console.log(binaryTree.inorder());
