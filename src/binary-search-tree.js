const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.leftLink = null;
    this.rightLink = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = placeNode(this.rootNode, data);

    function placeNode(node, data) {
      //check if node exists, if not - create one and place data in it
      if (!node) {
        return new Node(data);
      }
      //check if node's data is equal to our data, and if it is - just return it without extra operations
      if (data === node.data) {
        return node;
      }
      //here we decide where to go depending of the data and use recursive call
      if (data < node.data) {
        node.leftLink = placeNode(node.leftLink, data);
      } else {
        node.rightLink = placeNode(node.rightLink, data);
      }
      return node;
    }
  }

  has(data) {
    function checkExistence(node, data) {
      //if there is no such node - return false
      if (!node) {
        return false;
      }
      //if node with such value exists - return true
      if (data === node.data) {
        return true;
      }
      //here we decide which node.data to check and recursivly call function itself
      if (data < node.data) {
        return checkExistence(node.leftLink, data);
      } else {
        return checkExistence(node.rightLink, data);
      }
    }

    return checkExistence(this.rootNode, data);
  }

  find(data) {
    function returnNodeWith(node, data) {
      if (!node) {
        return null;
      }

      if (data === node.data) {
        return node;
      }

      if (data < node.data) {
        return returnNodeWith(node.leftLink, data);
      } else {
        return returnNodeWith(node.rightLink, data);
      }
    }

    return returnNodeWith(this.rootNode, data);
  }

  remove(data) {
    function removeNodeWith(node, data) {
      if (!node) {
        return null;
      }
      if (data < node.data) {
        node.leftLink = removeNodeWith(node.leftLink, data);
        return node;
      } else if (data > node.data) {
        node.rightLink = removeNodeWith(node.rightLink, data);
        return node;
      } else {
        if (!node.rightLink && !node.leftLink) {
          return null;
        }
        if (!node.leftLink) {
          node = node.rightLink;
          return node;
        }
        if (!node.rightLink) {
          node = node.leftLink;
          return node;
        }

        let storeMin = node.rightLink;
        while (storeMin.leftLink) {
          storeMin = storeMin.leftLink;
        }
        node.data = storeMin.data;
        //remove unattached node
        node.rightLink = removeNodeWith(node.rightLink, storeMin.data);
        return node;
      }
    }

    this.rootNode = removeNodeWith(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let storeMinNode = this.rootNode;
    while (storeMinNode.leftLink) {
      storeMinNode = storeMinNode.leftLink;
    }
    return storeMinNode.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let storeMaxNode = this.rootNode;
    while (storeMaxNode.rightLink) {
      storeMaxNode = storeMaxNode.rightLink;
    }
    return storeMaxNode.data;
  }
}

module.exports = {
  BinarySearchTree,
};
