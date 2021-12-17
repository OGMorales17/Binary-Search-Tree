class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// const tree = {root: node}
// insert(tree, val);

// function insert(tree, val) {

// }

// const tree = new BinarySearchTree(node);
// tree.insert(1);

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val)
      return this;
    }
    // Otherwise, find the correct spot for the new node
    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = new Node(val);
          return this;
        } else {
          current = current.left;
        }
      } else if (val > current.val) {
        if (current.right === null) {
          current.right = new Node(val);
          return this;
        } else {
          current = current.right;
        }
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    // If the tree is empty, insert at the root
    if (this.root === null) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (current.left === null) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left)
    } else {
      if (current.right === null) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right)
    }
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    let found = null;

    if (val === currentNode.val) return currentNode;

    while (currentNode && !found) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        found = true;
      }
    }
    if (!found) return undefined;
    return currentNode;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (this.root === null) return undefined;

    if (val < current.val) {
      if (current.left === null) return undefined;
      return this.findRecursively(val, current.left)
    } else if (val > current.val) {
      if (current.right === null) return undefined;
      return this.findRecursively(val, current.right)
    }
    return current;
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      data.push(node.val); // visit
      node.left && traverse(node.left); // Go left if there's a left
      node.right && traverse(node.right); // Go right if there's a right
    }
    traverse(current);
    return data;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // Go left if there's a left
      data.push(node.val) // visit
      node.right && traverse(node.right); // Go right if there's a right
    }
    traverse(current);
    return data;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let data = [];
    let current = this.root;

    function traverse(node) {
      node.left && traverse(node.left); // Go left is there's a left
      node.right && traverse(node.right); // Go right is there's a right
      data.push(node.val); // visit
    }
    traverse(current);
    return data;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let node = this.root;
    let queue = [];
    let data = [];

    queue.push(node)

    while (queue.length) {
      node = queue.shift();
      data.push(node.val);
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    return data;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this.removeNode(this.root, val)
  }

  // a recursive function to insert a new value in binary search tree
  removeNode(current, val) {
    // base case, if the tree is empty 
    if (current === null) return current

    // when value is the same as current's value, this is the node to be deleted
    if (val === current.val) {

      // for case 1 and 2, node without child or with one child
      if (current.left === null && current.right === null) {
        return null
      } else if (current.left === null) {
        return current.right
      } else if (current.right === null) {
        return current.left
      } else {

        /// node with two children, get the inorder successor, 
        //smallest in the right subtree
        let tempNode = this.kthSmallestNode(current.right)

        current.val = tempNode.val

        /// delete the inorder successor
        current.right = this.removeNode(current.right, tempNode.val)
        return current
      }

      // recur down the tree
    } else if (val < current.val) {

      current.left = this.removeNode(current.left, val)
      return current

    } else {

      current.right = this.removeNode(current.right, val)
      return current
    }
  }

  /// helper function to find the smallest node

  kthSmallestNode(node) {
    while (node.left !== null)
      node = node.left

    return node
  }



  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced(current = this.root) {
    if (current === null) return;
    return maxDepth(current) - minDepth(current) <= 1;

    function minDepth(current) {
      if (current === null) return 0;
      return 1 + Math.min(minDepth(current.left), minDepth(current.right));
    }

    function maxDepth(current) {
      if (current === null) return 0;
      return 1 + Math.max(maxDepth(current.left), maxDepth(current.right));
    }
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {
    // If the tree is too small, return
    if (!this.root || (!this.root.left && !this.root.right)) return;

    while (current) {
      // Current is the largest and has a left subtree and 2nd largest is the largest in that subtree
      if (current.left && !current.right) {
        return this.findSecondHighest(current.left);
      }
      // Current is parent of largest and largest has no children so current is 2nd largest
      if (current.right && (!current.right.left && !current.right.right)) {
        return current.val;
      }
      current = current.right;
    }
  }

  /**
   * dfsInOrder Iteratively
   * Write another version of the dfsInOrder function but do not use recursion. 
   * This can be challenging. Think about what the computer is doing for you when you make a recursive call.
   */

  dfsInOrderIteratively() {
    let cur = this.root;
    let stack = [];
    let dfs = [];

    while (stack.length > 0 || cur) {
      while (cur) {
        stack.push(cur);
        cur = cur.left;
      }
      cur = stack.pop();
      if (cur) {
        dfs.push(cur.val)
        cur = cur.right;
      }
    }
    return dfs
  }

}


module.exports = BinarySearchTree;
