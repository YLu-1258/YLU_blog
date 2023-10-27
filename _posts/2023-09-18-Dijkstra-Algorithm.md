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
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.util.Stack;
```


```java
public class Node {
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

    public int getDistanceBetweenTwoVertices(Node ProvidedDestinationVerticeNode) {
        return this.Edges.get(ProvidedDestinationVerticeNode.getIndex());
    }

    public ArrayList<Integer> getNeighborsOfVertice() {
        ArrayList<Integer> ListOfEdges = new ArrayList<Integer>();
        for ( int VerticeKey : this.Edges.keySet()) {
            ListOfEdges.add(VerticeKey);
        }
        return ListOfEdges;
    }
}
```


```java
public class BiDirectionalWeightedGraph {
    private ArrayList<Node> Graph;

    BiDirectionalWeightedGraph() {
        this.Graph = new ArrayList<Node>();
    }
    
    public ArrayList<Node> retrieveGraph(){
        return this.Graph;
    }

    private int getMaximumLabel() {
        return this.Graph.size();
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

    public Node getVerticeFromLabel(int ProvidedLabel) {
        for (Node vertice : this.Graph) {
            if (vertice.getIndex() == ProvidedLabel) {
                return vertice;
            }
        }
        return null;
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

    public int[][] getAdjacencyList() {
        int adjacencyList[][] = new int[Graph.size()][Graph.size()];
        for (Node vertice : Graph) {
            int source = vertice.getIndex();
            for (Map.Entry<Integer, Integer> entry : vertice.getEdges().entrySet()) {
                int destination = entry.getKey();
                int weight = entry.getValue();
                adjacencyList[source-1][destination-1] = weight;
            }
        }
        return adjacencyList;
    }

    public void setGraphFromAdjacencyList(int[][] adjacencyList){
        this.Graph = new ArrayList<Node>();         // Reset Graph to blank graph
        for (int index = 1; index <=adjacencyList.length; index++) {         // Initialize the new nodes 
            Node tempVertice = new Node(index);
            addVertice(tempVertice);
        }
        for (int i = 0; i<adjacencyList.length; i++) {
            for (int j = 0; j<adjacencyList[0].length; j++) {
                int source = i+1;                   // source is current index + 1
                int destination = j+1;              // destination is current index + 1
                int weight = adjacencyList[i][j];    // weight is current element of 2D array
                addEdgeToGraph(source, destination, weight);        // Add weighted edge
            } 
        }
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
Node vertice11 = new Node(11);


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
test.addVertice(vertice11);

test.addEdgeToGraph(10, 1, 50);
test.addEdgeToGraph(1, 2, 3);
test.addEdgeToGraph(2, 3, 2);
test.addEdgeToGraph(3, 4, 7);
test.addEdgeToGraph(4, 5, 1);
test.addEdgeToGraph(5, 6, 4);
test.addEdgeToGraph(6, 7, 6);
test.addEdgeToGraph(7, 8, 8);
test.addEdgeToGraph(8, 9, 9);
test.addEdgeToGraph(9, 10, 1000);
test.addEdgeToGraph(10, 2, 40);
test.addEdgeToGraph(2, 4, 6);
test.addEdgeToGraph(4, 6, 8);
test.addEdgeToGraph(6, 8, 10);
test.addEdgeToGraph(8, 10, 20000);
test.addEdgeToGraph(1, 3, 6);
test.addEdgeToGraph(3, 5, 8);
test.addEdgeToGraph(5, 7, 10);
test.addEdgeToGraph(7, 9, 2);


ArrayList<Node> sampleList = test.retrieveGraph();
for (Node node: sampleList) {
    System.out.println(node.getIndex() + " : " + node.getEdges());
}

System.out.println(sampleList.size());
int sampleAdjacencyList[][] = test.getAdjacencyList();
for (int i = 0; i < sampleAdjacencyList.length; i++ ) {
    for (int j = 0; j < sampleAdjacencyList.length; j++ ) {
        System.out.print(sampleAdjacencyList[i][j] + " ");
    }
    System.out.println();
}
```


    |           for (int index = 1; index <=adjacencyList.lenth; index++) {         // Initialize the new nodes 

    cannot find symbol

      symbol:   variable lenth

    


## Dijkstra methods



```java
public class DijkstraAlgorithm {
    private static final int inf = Integer.MAX_VALUE;
    private static HashMap<Node, Integer> ShortestDistanceMap;
    private static HashMap<Integer, Integer> ParentVerticesMap;
    private static ArrayList<Node> NodeArrayList;
    private static Node CurrentNodeToTraverse;
    private static int alt;
    private static BiDirectionalWeightedGraph InputGraph;
    
    
    public static HashMap<Node, Integer> dijkstra(BiDirectionalWeightedGraph Graph, int SourceVertexLabel) {
        InputGraph = Graph;
        ShortestDistanceMap = new HashMap<Node, Integer>();
        ParentVerticesMap = new HashMap<Integer, Integer>();
        NodeArrayList = new ArrayList<Node>();
        Node SourceVertextNodeObject = InputGraph.getVerticeFromLabel(SourceVertexLabel);
        Node CurrentNodeToTraverse;
        for (Node vertice : InputGraph.retrieveGraph()) {
            ShortestDistanceMap.put(vertice, inf-1);
            ParentVerticesMap.put(vertice.getIndex(), null);
            NodeArrayList.add(vertice);
        }

        ShortestDistanceMap.put(SourceVertextNodeObject, 0);

        while (NodeArrayList.size() != 0) {
            CurrentNodeToTraverse = FindMinDistInNodesArrayList();
            NodeArrayList.remove(CurrentNodeToTraverse);

            for (int verticeLabel : CurrentNodeToTraverse.getNeighborsOfVertice()) {
                Node vertice = InputGraph.getVerticeFromLabel(verticeLabel);
                if (NodeArrayList.contains(vertice)) {
                    alt = ShortestDistanceMap.get(CurrentNodeToTraverse) + vertice.getDistanceBetweenTwoVertices(CurrentNodeToTraverse);
                    if (alt < ShortestDistanceMap.get(vertice)) {
                        ShortestDistanceMap.put(vertice, alt);
                        ParentVerticesMap.put(vertice.getIndex(), CurrentNodeToTraverse.getIndex());
                    }
                }
            } 
        }
        return ShortestDistanceMap;
    }

    private static Node FindMinDistInNodesArrayList () {
        int minimumDistance = inf; 
        int newDistance;
        Node optimalNode = null;
        for (Node vertice : NodeArrayList) {
            newDistance = ShortestDistanceMap.get(vertice);
            if (newDistance < minimumDistance) {
                minimumDistance = newDistance;
                optimalNode = vertice;
            }
        }
        return optimalNode;
    }

    public static Stack<Integer> ReverseIteratePath (int sourceNodetoIterate, int targetNodetoIterate) {
        Stack<Integer> ShortestPathStack = new Stack<Integer>();
        System.out.println(ParentVerticesMap.get(targetNodetoIterate));
        Integer CurrentNodeToTrace = targetNodetoIterate;
        if (ParentVerticesMap.get(CurrentNodeToTrace)!=null || CurrentNodeToTrace == sourceNodetoIterate) {
            System.out.println("HELLLLLLLLLO IF THIS RUNS I THINK JAVA IS BROKEN");
            while (CurrentNodeToTrace!=null) {
                ShortestPathStack.push(CurrentNodeToTrace);
                CurrentNodeToTrace = ParentVerticesMap.get(CurrentNodeToTrace);
            }
        }
        return ShortestPathStack;
    }

    public static void main(String args[]) {
        dijkstra(test, 9);
        for (Map.Entry<Node, Integer> optimalDistance : ShortestDistanceMap.entrySet()) {
            System.out.println("Shortest distance from vertex 9 to vertex " + 
            optimalDistance.getKey().getIndex() + 
            " is: " 
            + optimalDistance.getValue());
        }
        Stack<Integer> OptimalDistanceToTarget = ReverseIteratePath(9, 10);
        System.out.println(OptimalDistanceToTarget);
        while (!OptimalDistanceToTarget.isEmpty()) {
            System.out.println(OptimalDistanceToTarget.pop());
        }
    }

}
DijkstraAlgorithm.main(null);
```

    Shortest distance from vertex 9 to vertex 2 is: 19
    Shortest distance from vertex 9 to vertex 3 is: 20
    Shortest distance from vertex 9 to vertex 4 is: 13
    Shortest distance from vertex 9 to vertex 5 is: 12
    Shortest distance from vertex 9 to vertex 8 is: 9
    Shortest distance from vertex 9 to vertex 7 is: 2
    Shortest distance from vertex 9 to vertex 10 is: 59
    Shortest distance from vertex 9 to vertex 1 is: 22
    Shortest distance from vertex 9 to vertex 6 is: 8
    Shortest distance from vertex 9 to vertex 11 is: 2147483646
    Shortest distance from vertex 9 to vertex 9 is: 0
    2
    HELLLLLLLLLO IF THIS RUNS I THINK JAVA IS BROKEN
    [10, 2, 4, 5, 7, 9]
    9
    7
    5
    4
    2
    10



```java

```
