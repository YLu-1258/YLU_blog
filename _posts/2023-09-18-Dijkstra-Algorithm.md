---
title: Dijkstra's Algorithm
author: alex
badges: True
comments: True
categories: ['algorithm', 'tutorials']
date: 2023-09-13 09:00:00 -0800
tags: ['notebooks', 'pathfinding']
week: 4
render_with_liquid: False
type: hacks
---

# Dijkstra's Algorithm

In Computer Science, a common problem that we encounter are **parthfinding problems**. These problems are typically seen in GPS programs, maze-solvers, or robotics. We would typically represent the map in queston with a graph. For the sake of demonstrating Dijkstra's algorithm, we will implement our own weighted graphs to use for this algorithm 

## Weighted Graph

To implement our weighted graph, we could create a `Node()` object representing each individual vertice, and the weighted edges that it is connected by. This Node object should have the following properties:
- Store the label of the Vertice at question
- Store a hashmap of edges that points to other nodes, associated with a numerical value (Integer:Integer)
- Grab the label and edges
- Update the label and edges
- Add an edge to a node connecting it to an adjacent node.
Additionally, our `WeightedGraph()` object should support opperations to create a shared edge beween two nodes, such that our graph is always bi-directional.


```java
import java.util.HashMap;       // Import the Hashmap that we'll need for this implementation
import java.util.PriorityQueue; // Import the PriorityQueue that we'll need for Dijkstra's Algorithm
import java.util.ArrayList;
```


```java
public class Node{
    private int VerticeIndex;
    private HashMap<Integer, Integer> Edges;

    Node (int ProvidedIndexFromFrontend) {
        this.VerticeIndex = ProvidedIndexFromFrontend; 
        this.Edges = new HashMap<Integer, Integer>();
    }

    Node (int ProvidedIndexFromFrontend, HashMap<Integer, Integer> ProvidedEdgesFromFrontend) {
        this.VerticeIndex = ProvidedIndexFromFrontend; 
        this.Edges = ProvidedEdgesFromFrontend;
    }

    public int getIndex() {
        return this.VerticeIndex;
    }

    public HashMap<Integer, Integer> getEdges() {
        return this.Edges;
    }

    public void setIndex(int ProvidedIndex) {
        this.VerticeIndex = ProvidedIndex;
    }

    public void addEdgeToVertex(int ProvidedDestinationIndex, int ProvidedEdgeWeight) {
        this.Edges.put(ProvidedDestinationIndex, ProvidedEdgeWeight);
    }

    public void removeEdgeFromVertex(int ProvidedDestinationIndex) {
        this.Edges.remove(ProvidedDestinationIndex);
    }
}
```


```java
public class BiDirectionalWeightedGraph {
    private ArrayList<Node> Graph;

    WeightedGraph() {
        this.Graph = new ArrayList<Node>();
    }
    
    public ArrayList<Node> RetrieveArrayofVertices(){
        return this.Graph;
    }

    private int getMaximumLabel() {
        return this.Graph.size();
    }

    private Node getVerticeFromLabel(int ProvidedLabel) {
        for (Node vertice : this.Graph) {
            if (vertice.getIndex() == ProvidedLabel) {
                return vertice;
            }
        }
        return null;
    }

    private boolean isVerticeExist(int ProvidedLabel) {
        for (Node vertice : this.Graph) {
            if (vertice.getIndex() == ProvidedLabel) {
                return true;
            }
        }
        return false;
    }

    public void addVertice(Node ProvidedNewVertice) {
        for (Node vertice : this.Graph) {
            if (vertice.getIndex() == ProvidedNewVertice.getIndex()) {
                return ;
            }
        }
        this.Graph.add(ProvidedNewVertice);
    }

    public void addEdgeToGraph(int ProvidedSourceVertice, int ProvidedDestinationVertice, int ProvidedEdgeWeight) {
        assert isVerticeExist(ProvidedSourceVertice);
        assert isVerticeExist(ProvidedDestinationVertice);
        Node SourceVerticeObj = getVerticeFromLabel(ProvidedSourceVertice);
        Node DestinationVerticeObj = getVerticeFromLabel(ProvidedDestinationVertice);
        SourceVerticeObj.addEdgeToVertex(ProvidedDestinationVertice, ProvidedEdgeWeight);   
        DestinationVerticeObj.addEdgeToVertex(ProvidedSourceVertice, ProvidedEdgeWeight);       
    }

    public void removeEdgeFromGraph(int ProvidedSourceVertice, int ProvidedDestinationVertice, int ProvidedEdgeWeight) {
        assert isVerticeExist(ProvidedSourceVertice);
        assert isVerticeExist(ProvidedDestinationVertice);
        Node SourceVerticeObj = getVerticeFromLabel(ProvidedSourceVertice);
        Node DestinationVerticeObj = getVerticeFromLabel(ProvidedDestinationVertice);
        SourceVerticeObj.removeEdgeFromVertex(ProvidedDestinationVertice);   
        DestinationVerticeObj.removeEdgeFromVertex(ProvidedSourceVertice);       
    }
}

BiDirectionalWeightedGraph test = new BiDirectionalWeightedGraph();

Node vertice1 = new Node(1);
Node vertice2 = new Node(2);
Node vertice3 = new Node(3);
Node vertice4 = new Node(4);
Node vertice5 = new Node(5);
Node vertice6 = new Node(6);
Node vertice7 = new Node(7);
Node vertice8 = new Node(8);
Node vertice9 = new Node(9);
Node vertice10 = new Node(10);


test.addVertice(vertice1);
test.addVertice(vertice2);
test.addVertice(vertice3);
test.addVertice(vertice4);
test.addVertice(vertice5);
test.addVertice(vertice6);
test.addVertice(vertice7);
test.addVertice(vertice8);
test.addVertice(vertice9);
test.addVertice(vertice10);

test.addEdgeToGraph(10, 1, 5);
test.addEdgeToGraph(1, 2, 3);
test.addEdgeToGraph(2, 3, 2);
test.addEdgeToGraph(3, 4, 7);
test.addEdgeToGraph(4, 5, 1);
test.addEdgeToGraph(5, 6, 4);
test.addEdgeToGraph(6, 7, 6);
test.addEdgeToGraph(7, 8, 8);
test.addEdgeToGraph(8, 9, 9);
test.addEdgeToGraph(9, 10, 10);
test.addEdgeToGraph(10, 2, 4);
test.addEdgeToGraph(2, 4, 6);
test.addEdgeToGraph(4, 6, 8);
test.addEdgeToGraph(6, 8, 10);
test.addEdgeToGraph(8, 10, 2);
test.addEdgeToGraph(1, 3, 6);
test.addEdgeToGraph(3, 5, 8);
test.addEdgeToGraph(5, 7, 10);
test.addEdgeToGraph(7, 9, 2);


ArrayList<Node> sampleList = test.RetrieveArrayofVertices();
for (Node node: sampleList) {
    System.out.println(node.getIndex() + " : " + node.getEdges());
}
```

    1 : {2=3, 3=6, 10=5}
    2 : {1=3, 3=2, 4=6, 10=4}
    3 : {1=6, 2=2, 4=7, 5=8}
    4 : {2=6, 3=7, 5=1, 6=8}
    5 : {3=8, 4=1, 6=4, 7=10}
    6 : {4=8, 5=4, 7=6, 8=10}
    7 : {5=10, 6=6, 8=8, 9=2}
    8 : {6=10, 7=8, 9=9, 10=2}
    9 : {7=2, 8=9, 10=10}
    10 : {1=5, 2=4, 8=2, 9=10}


## Dijkstra methods



```java
public class DijkstraAlgorithm {
    private static final int inf = Integer.MAX_VALUE;
    private HashMap<Node, Integer> ShortestDistanceMap;
    private HashMap<Node, Integer> ParentVerticesMap;
    private ArrayList<Node> NodeArrayList;
    private Node CurentNodeToTraverse;

    public static ArrayList<Integer> dijkstra(BiDirectionalWeightedGraph Graph, int SourceVertexLabel) {
        ShortestDistanceMap = new HashMap<Node, Integer>();
        ParentDistanceMap = new HashMap<Node, Integer>();
        NodeArrayList = new ArrayList<Node>();
        Node SourceVertextNodeObject = Graph.getVerticeFromLabel(SourceVertexLabel);
        for (Node vertice : Graph.RetrieveArrayofVertices()) {
            ShortestDistanceMap.put(vertice, inf);
            ParentDistanceMap.put(vertice, null);
            NodeArrayList // look here

        }

        ShortestDistanceMap.put(SourceVertextNodeObject, 0);

        while (!NodePriorityQueue.isEmpty()) {
            CurrentNodeToTraverse = 
        }

        
    }
}
```
