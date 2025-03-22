---
title: Red Black Trees
author: alex
badges: True
comments: True
categories: ['CS61B']
date: 2025-03-05 1:00:00 -0800
math: True
tags: ['CS61B', 'Data Structures', 'Red Black Trees', 'JAVA']
---

# Tree Rotations
- Inserting the same elements in different orders into a BSt produces different BST structures.
- A B-Tree equivalent of rotating left or right means to join the left or right child with the parent node, and then pushing the parent node down.
- The procedures can be descriped as such:
  - rotateLeft(G): Let x be the right child of G, make G the left child of x.
  - rotateRight(G): Let x be the left child of G, make G the right child of x.
- Rotating Left:
  - We store left child of x as y. We know y is greater than G by BST invariants.
  - We set the the right child of G as y.
  - we set x's left child as G as x is greater than G.
- Rotating Right:
  - We store the right child of x as y. We know that y is lesser than G by BST invariants.
  - We set the left child of G as y.
  - we set x's right child as G as x is lesser than G.
- Rotation on a non-root node happens as we disconnect the node from the parent, and then reconnect the new root.
- Java implementation of rotation operations:


```java
private Node rotateRight(Node h) {
	Node x = h.left;
	h.left = x.right;
	x.right = h;
	return x;
}

private Node rotateLeft(Node h) {
	Node x = h.right;
	h.right = x.left;
	x.left = h;
	return x;
}
```

## Balancing BSTs with Tree Rotation
- Trees may be balanced with rotations
- We always rotate from the bottom to up.
- Rotations shorten or lengthen a tree's height but always preserves the tree's property.

## Constructing a Left-Leaning Red Black Tree
- We combine the simplicity of a BST with the balanced nature of a 2-3 Tree.
- A 2-3 Tree with only nodes with 2 children is already a BST.
- We focus on the 3-children case. One option is to create a glue node that does not hold any information but only shows that the two children are part of one node.
  - This would simulate a 2-3 Tree structure.
- However, creating dummy nodes would result in much wasted space. Thus, we can also just color the edges to glue together elements of the same node.
- For a left-leaning red black tree, we make the left element of a 2-node a left child of the right element.
![LLRBT](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FlabuuQaI8JtqYfMAMXy1%252FScreen%2520Shot%25202023-02-27%2520at%25208.31.57%2520PM.png%3Falt%3Dmedia%26token%3Dcefe9441-1594-4265-bace-d3f9700cab64&width=768&dpr=2&quality=100&sign=8ba1c65c&sv=2) 
- LLRBT have a **1-1 correspondence with 2-3 trees**. This means that every 2-3 tree has a unique LLRBT.
  - Standard Red-Black Trees have correspondance with 2-3-4 trees.

### Invariants of LLRB Trees:
- 1-1 correspondence with 2-3 trees.
- No node has 2 red links
- There are no red right-links
- Every path from root to leaf has the same number of black links (as 2-3 trees hae the same number of links to every leaf)
- Height is no more than 2x height + 1 of the corresponding 2-3 tree
- The height of a red-black tree is proportional to the log of the number of entries.

# Inserting LLRB Trees
- A LLRB Tree will handle imbalance from insertions with rotations.
- In a 2-3 Tree, we always first add a node to a leaf node. In a RB-Tree, we always add a new node with a **red link**.
  - When the invariants of the LLRB Tree is violated, we use tree rotations.
- There are 3 total cases to address the LLRB structure

## Case 1: Insertion results in a right leaning "3-Node"
![Case 1: Inserting a Right Red Link](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FokHHZtbRyLXccIEFaOY4%252FScreen%2520Shot%25202023-02-27%2520at%25208.57.00%2520PM.png%3Falt%3Dmedia%26token%3Dd0499fb0-2fdb-4263-b2b0-6b20c605c26b&width=768&dpr=2&quality=100&sign=238e5438&sv=2)
- In this case, we can just rotate the node to the left. This will give us a left red node.

## Case 2: Double insertion on left results in two consecutive red links.
![Case 2: Double Insertion on the Left](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FEnMUNTPORQi12PX7wMqC%252FScreen%2520Shot%25202023-02-27%2520at%25208.58.30%2520PM.png%3Falt%3Dmedia%26token%3D425edbb2-91c0-4321-a738-a71484e30adc&width=768&dpr=2&quality=100&sign=268f4c2d&sv=2)
- Two left links indicates a 4-Node, which is not permitted under a 2-3 Tree.
- We first rotate the parent of the two nodes to the right. This gives us a different violation

## Case 3: Node has Two Red Children
![Case 3: Two Red Links](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252F1ZlL0yP2Mxr4ZBWUEqyY%252FScreen%2520Shot%25202023-02-27%2520at%25209.02.17%2520PM.png%3Falt%3Dmedia%26token%3D544c407f-5a49-43b7-9b4d-dfcd1df71421&width=768&dpr=2&quality=100&sign=6e5ef1e2&sv=2)
- This is still another 4-Node. However, we may just flip the colors of all edges touching the parent of the two nodes.
- Whenever we perform a maintainance rotation or flip operation, we may create new violations above in the tree.
  - We simply just apply the three cases that we have to fix these cases. 

# Runtime Analysis
- Since a red-black tree has a 1-1 correspondance with a 2-3 Tree, all operations of a red-black tree are $O(\log N)$
  - LLRB Trees have height $O(\log N)$
  - Contains is trivially $O(\log N)$.
  - Insert is $O(\log N)$.
    - $O(\log N)$ to add the new node.
    - $O(\log N)$ rotation and color flip operations per insert. Rotation and Color Flip are all constant time.


```java
private Node put(Node h, Key key, Value val) {
    if (h == null) { return new Node(key, val, RED); }

    int cmp = key.compareTo(h.key);
    if (cmp < 0)      { h.left  = put(h.left,  key, val); }
    else if (cmp > 0) { h.right = put(h.right, key, val); }
    else              { h.val   = val;                    }

    if (isRed(h.right) && !isRed(h.left))      { h = rotateLeft(h);  }
    if (isRed(h.left)  &&  isRed(h.left.left)) { h = rotateRight(h); }
    if (isRed(h.left)  &&  isRed(h.right))     { flipColors(h);      } 

    return h;
}
```
