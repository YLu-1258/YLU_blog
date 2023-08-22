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

    public Node retrieve(int idx) {
        if (idx == 0) {
            return head;
        }
        Node curr = head.next;
        int count = 1;
        while (count)
    }
    public void delete(int data) {
        Node curr = head;
        // If head is the value to delete
        if (curr.data == data) {
            head = curr.next;
        }
        // If head is not hte value to delete
        while (curr.next != null) {
            if (curr.next.data == data) {
                curr.next = curr.next.next;
                return;
            }
            curr = curr.next;
        }
        System.out.println("Data value " + data + " is not found in linked list");
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
ll1.delete(3);
ll1.print_list();
```

    1->2->3->4->5
    1->2->4->5


## Doubly linked-list
![](/assets/img/DS/doubly_linked_list.png "Doubly Linked-List")
A big disadvantage of the singly linked-list is that traversal is only possible in one direction. A double linked-list seeks to solve that.  

In a doubly linked-list, each node besides the head has a reference to the node infront of it, AND the previous node. With this setup, we can easily move forwards and backwards between each node in our linked list.  

However, the trade off is that more memory is required for each node in order to store the backwards reference as well.

Below is an implementation of the doubly linked list



```java
static class DNode {
    int data;
    DNode prev;
    DNode next;
    DNode(int d) {
        data = d;
        prev=null;
        next=null;
    }
}
class DLinkedList {
    DNode head;
    DLinkedList(int data) {
        head = new DNode(data);
    }

    public void append(int data) {
        DNode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = new DNode(data);
        curr.next.prev = curr;
    }

    public void insert(int idx, int data) {
        int count = 0;
        DNode curr = head;
        if (idx == 0){
            DNode temp = head;
            head = new DNode(data);
            head.next = temp;
            head.next.prev = head;
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
        DNode newnode = new DNode(data);
        if (curr.next != null) {
            DNode next = curr.next;
            curr.next = newnode;
            curr.next.prev = curr;
            curr.next.next = next;
            curr.next.next.prev = curr.next;
        } else {
            curr.next = newnode;
            curr.next.prev = curr;
        }
    }

    public void delete(int data) {
        DNode curr = head;
        // If head is the value to delete
        if (curr.data == data) {
            head = curr.next;
        }
        // If head is not hte value to delete
        while (curr.next != null) {
            if (curr.next.data == data) {
                curr.next = curr.next.next;
                return;
            }
            curr = curr.next;
        }
        System.out.println("Data value " + data + " is not found in linked list");
    }

    public void push_back(int data) {
        Dnode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = new DNode(data);
        curr.next.prev = curr;
        return
    }

    public void print_list() {
        DNode curr = head;
        while (curr.next!=null){
            System.out.print(curr.data + "<->");
            curr = curr.next;
        }
        System.out.print(curr.data + "\n");
    }


}

DLinkedList dll1 = new DLinkedList(1);
dll1.append(2);
dll1.append(3);
dll1.append(4);
dll1.insert(4,5);
dll1.print_list();  
dll1.delete(5);
dll1.print_list();  


```

    1<->2<->3<->4<->5
    1<->2<->3<->4

