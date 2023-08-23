---
title: Java DS 2 Queue
author: alex
badges: True
comments: True
categories: ['Java', 'tutorials']
date: 2023-08-20 20:48:00 -0800
tags: ['notebooks', 'java', 'queue', 'datastructures']
render_with_liquid: False
---

# Queue
Imagine a fair. When entering the fair grounds, you would typically wait in a line until you gain entry. The rule of the line is simple. Whoever arrives first, is also the first to get out of a line
![](/assets/img/DS/line_of_people.jpg "A line of people")
A queue data structure works in a similar manner. It is a collection of similar objects, supporting three main capabilities, pushing into the queue, popping from the queue, and peeking into a queue. We call structures like the queue a **FIFO (First-in-First-Out)** data structure.  

| Term | Definition |
|-|-|
| `PushEnqueue` | To add a new item onto the queue. |
| `PopDequeue` | To return and remove the first item on the queue |
| `Peek` | To see the first item on the queue without removing it. |

## Implementing a Queue
There are several ways about implementing a queue from scratch. In this blog, I will be demonstrating the linked-list implementation.  

A queue implemented through a linked-list is also called a **linked queue**. Within a linked queue, there are two "pointers", the `front` and `rear`. The front pointer is responsible for keeping track of the __first element in the queue__, while the rear pointer points to the __last element in the queue__. When the queue is empty, both the front and rear pointers point to `null`. This serves to add efficiency to the queue because we can add to the rear without traversing through the rest of the queue.  

Each individual element in this queue could also be represented as a `Node` object, containing a data value, and a pointer to the next object in the queue. This would use the same implementation as our `Node` object for the linked list.

### Node Definition


```java
static class Node {
    int data;
    Node next;
    Node (int data) {
        this.data = data;
        this.next = null;
    }
}

Node test_n = new Node(1);
System.out.println(test_n.data + " " + test_n.next);
```

    1 null


### Queue Definition


```java
public class Queue {
    private Node front;
    private Node rear;
    Queue () {
        this.front = this.rear = null;
    }

    public boolean is_empty() {
        return (this.front == null && this.rear == null);
    }

    public void enqueue(int data) {
        Node new_node = new Node(data);
        if (is_empty()) {
            this.front = new_node;
            this.rear = new_node;
            return ;
        }
        this.rear.next = new_node;
        this.rear = new_node;
    }

    public void dequeue () {
        if (this.front == null) {
            System.out.println("Queue is Empty!");
            return ;
        }
        this.front = this.front.next;
        if (this.front == null) {
            this.rear = null;
        }
    }

    public int peek () {
        if (this.front == null) {
            throw new IllegalStateException("Queue is empty");
        }
        return this.front.data;
    }
}

Queue q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
System.out.println(q.peek());
q.dequeue();
System.out.println(q.peek());
q.dequeue();
System.out.println(q.peek());

```

    1
    2
    3

