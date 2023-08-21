---
title: Java DS 1 Linked Lists
author: alex
badges: True
comments: True
categories: ['Java', 'tutorials']
date: 2023-08-20 20:48:00 -0800
tags: ['notebooks', 'java', 'linkedlist', 'datastructures']
render_with_liquid: False
---

# Linked Lists
Linked lists are a very powerful and versatile sequential data structure. While traditional lists store their information in contiguous blocks of memory. Linked lists are more flexible. Each element in a linked list contains a value, and a reference to the next item in the list. This implementation comes with a combination of advantages and setbacks.

| Advantages | Setbacks |
|-|-|
| Faster insertion and deletion speed | Slower traversal speed |
| Dynammic size (can grow and shrink freely) | More memory  to store the reference to next element |
| Flexible storage in memory | Reverse traversing not possible in a **Singly Linked-List** |
| Minimal wasted memory (Everything is preallocated) | No random access is possible |

## Singly Linked-List
![](/assets/img/DS/singly_linked_list.png "Singly Linked-List")
As the name suggests, a singly linked-list implies a single connection from one node to the next. In order words, the list can only go in one direction. Here are some terminologies for this structure:  

| Vocab | Definition |
|-|-|
| `Node` | A distinct structure in a linked-list that contains each element | 
| `Head` | First node in the linked-list, typically the point of access |
| `Tail` | Last node in the linked-list, points to null |
| `Data` | The value held by a node in a linked-list |
| `Next pointer` | Points to next element in list |  

Here is an implementation of the node structure in Java.


```java
// Implementation of the Node structure
static class Node {
    int data;
    Node next;
    Node (int d) {
        data = d;
        next = null;
    } 
}

Node head = new Node(2);
head.data
```




    2



Here is an implementation of a singly Linked-List in Java


```java
class LinkedList {
    Node head;
    LinkedList(int data) {
        head = new Node(data);
    }

    public void append(int data) {
        Node curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = new Node(data);
    }

    public void insert(int idx, int data) {
        int count = 0;
        Node curr = head;
        if (idx == 0){
            Node temp = head;
            head = new Node(data);
            head.next = temp;
            return;
        }
        while (count < idx-1) {
            if (curr.next != null) {
                curr = curr.next;
                count++;
            } else {
                System.out.println("Index " + idx + " Out of bounds");
                return;
            }
        }
        Node next = curr.next;
        curr.next = new Node(data);
        curr.next.next = next;
    }

    public void print_list() {
        Node curr = head;
        while (curr.next!=null){
            System.out.print(curr.data + "->");
            curr = curr.next;
        }
        System.out.print(curr.data + "\n");
    }
}

LinkedList ll1 = new LinkedList(1);
ll1.head.data;
ll1.append(2);
ll1.append(3);
ll1.append(4);
ll1.insert(4,5);
ll1.print_list();

```

    1->2->3->4->5

