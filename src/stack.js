const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Stack {
  constructor() {
    this.head = null;
  }
  push(element) {
    let storeNode = new StackNode(element);

    if (this.head) {
      storeNode.next = this.head;
      this.head = storeNode;
    } else {
      this.head = storeNode;
    }
  }

  pop() {
    let storeOldHead = this.head;
    this.head = this.head.next;
    return storeOldHead.value;
  }

  peek() {
    return this.head.value;
  }
}

module.exports = {
  Stack,
};
