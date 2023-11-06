---
title: Trimester 1 Reflection
author: alex
badges: True
comments: True
categories: ['Tri1', 'Reflection']
date: 2023-11-02 00:00:00 -0800
week: 11
render_with_liquid: False
type: plans
---
## Group Contribution
Overall, I had a pretty consistent habit of commiting as Scrum Master. Because of my role, I had a more hollistic view of the project than the specialized roles (FE and BE developers), and I was effective at helping both ends with critical bugs and features to implement. I was also responsible for building the main algorithm that powered our demonstration of dijkstra's algorithm, which I had to research and program on my own. As for the major set up and baseline code, I left to the other members to take care of. One issue that I face however, is hording up edits before commiting. I have a bad habit of making sure that everything worked before commiting, which resutled in bulkier, but less frequent commits  
![Commit Trend](/assets/img/tri1/commits.png)   
Below is the picture for my contributions on the backend project:
![Backend Commit Trend](/assets/img/tri1/be_commits.png)   
Below is the picture for my contributions on the frontend project, keeping in mind that  we had multiple iterations of the frontend, which was due to the fact that we tried multiple frontend frameworks (svelt, vue.js, then to fastpages). There are more commits I had on the other repos, but they didn't contribute to our project at the end, so I didn't incorporate them.  
![Backend Commit Trend](/assets/img/tri1/fe_commits.png)   

### Dijkstra's algorithm
As the one who proposed the project, I was naturally also responsible for implementing the algorithm. The implementation was largely seperated into two different portions:  
 - The Data Structures  
 - The Algorithm  
   
The examples from the research papers and articles that I read all adopted an adjacency matrix format to structure the graph. However, because our project worked with a graphical user interface for the user to interact with, I opted for an Object-Oriented approach so I could better store attributes for each node in the graph. What I ended with, is a class to describe each node, with corresponding attributes of the node, and also a class for the graph, that contains the arraylist storing all the nodes and additional methods for manipulating the graph:  
![Node Class](/assets/img/tri1/node_obj.png)     
![Graph Class](/assets/img/tri1/graph_class.png)  

For the actual algorithm, I had learned the pseudo code previously from an Algorithm's class that I am currently auditing at UPenn. Thus, I am already familiar with the Pseudocode of the algorithms, as well with how it worked. All that was left for me to do was to translate the algorithm in to Java, and also adapt it to work with our graph data structure, instead of an adjacency matrix.  
![Dijkstra Goal](/assets/img/tri1/dijkstra_goal.png)  
```
Dijkstra (G, s)
    for each v ∈ V do
        dist [v] = ∞
        parent [v] = NIL
    dist [s] = 0
    S = ∅
    Q = min - priority queue on all vertices , keyed by dist value
    while Q is not empty do
        u = Extract - Min (Q)
        S = S ∪ {u}
        for each v ∈ Adj [u] do
            if dist [v] > dist [u] + w(u, v) then       // edge relaxation step
                dist [v] = dist [u] + w(u, v)           // decrease - key operation
                parent [v] = u
```   
Here is a snippet of my code:  
![Dijkstra Algorithm](/assets/img/tri1/dijkstra_algo.png)  
The complete code and documentation can be found at [Dijkstra's Algorithm](https://ylu-1258.github.io/YLU_blog/posts/Dijkstra-Algorithm/) 

### Backend Work
On the backend, I was mainly responsible for integrating the algorithm into our APIs, as well as creating a graph object model for it. While the example provided directly grabbed data from the requset body, I did some research and realized that I could create an object to resemble the JSON that I send to essentially convert my JSON into POJO data. From there, it was much easier to access the data that I wanted. Here is a snippet of the code:  
![Graph Request](/assets/img/tri1/graph_request.png)  
Looking back, I could've cleaned up the code if I had used lombok to generate the getters/setters for me. The API endpoint for Dijkstra is shown below, which wraps up the work in the backend for me:   
![Dijkstra APi](/assets/img/tri1/dijkstra_api.png)  

### Frontend Work.
On the frontend, I mainly worked with david at getting our edit and view controllers for placing down nodes, and viewing the paths. To do this, we used inheritance to create a base controller class with joint.js methods, and then created subclasses from them.  
![Controller Parent](/assets/img/tri1/controller.png)  
![View Controller](/assets/img/tri1/view_controller.png)  
![Edit Controller](/assets/img/tri1/edit_controller.png)  
I also used the adjacency matrix idea to send the graph data from FE to BE:  
![Adjancency Matrix](/assets/img/tri1/adj_matrix.png)  

## Teamwork/Agile Reflection, Improvements to be made
There were both positives and negative when it came to teamwork and our agile manifesto.  

On the positive side, our group was especially effective at communicating with each other outside of the classroom. We would gather in other classrooms during lunch to plan our a projects on the whiteboards with everyone else, as seen in this issue: https://github.com/CSA-Tri-1/DADDJbackend/issues/2. Aditionally, we made good use of other technologies to reinforce team work, such as a dedicated scrumboard to manage our issues and tasks, vscode live share to colaborately work on code, and discord calls for remote communication.  
![Scrumboard](/assets/img/tri1/scrumboard.png)  

However, improvements can be made with our focus and agile methodology. Some group members were a little bit off focus or unattentative during coding sessions and presentation, which may have contributed to a more negative experience for the consumers of our product. Additionally, we were a little bit rushed towards the end for our project, because we had to switch the frontend implementations 2 times. These obstacles could've been avoided in the feature weel phase if we had a more solid plan for tackling how our project operated. This is definitely something to improve for trimester 2.

## Individual grades:
Here is the reflection to my collegeboard MCQ: [link](https://ylu-1258.github.io/YLU_blog/posts/Collegeboard-MCQ-Practice/)

Here is the link to my lab notebook: [link](https://ylu-1258.github.io/YLU_blog/lab-notebook/)

Here is the link to my scores for the past few weeks of student lessons: [link](https://github.com/YLu-1258/YLU_blog/issues/6)


## Reflection as Scrum Master
As Scrum Master, this was definitely one of the more functional teams that I've had in CS before. Everyone knew their corresponding tasks and was able to successfully complete it before the deadline. As Scrum Master, I was also on top of creating issues and ensuring that the project was on track, as evident by our scrum board:  
![Scrumboard](/assets/img/tri1/scrumboard.png)  
However, one thing that could be improved on for our team, is to focus more on the features and plan well during feature week. We faced many difficulties in our project because of poor planning that caused us to restart our frontend many times. It was due to this that we had to scrap one of our project ideas.
## Code Reflection/ Knolwedge gained
Overall, I feel like the project this trimester has forced me to go beyond the usual algorithms I write to research, design, and formulate a unique algorithm that people (in this class) haven't seen before. Being in CSA, I was able to successfully incorporate aspects of Object-Oriented Programming into my backend and frontend code to make the  project work efficient and modularily. Additionally, I was able to make use of my knowledge in applied/discrete math to actually understand the proofs for the Dijkstra algorithm, when it came to proving its running time and space complexity. Doing so made designing more complex objects, such as the weighted graph, or the controllers for the frontend easier to manage, and more versatile as a result.  

## Final thoughts
Overall, I believe that this trimester was an especially rewarding experience. Not only did I gain experience in working with higher level algorithms that aren't covered by the CollegeBoard curriculum, I have also been inspired by other N@TM projects for new ideas for projects whether it be in the classroom or outside. In particular, I want to see if I could pursue an AI project next trimester by training my own AI model in the backend with Java and linking it up with Spring Boot to display data. It would be cool if I could create a stock predictor or something similar to that idea. Learning Java this trimester also helped to reinforce the OOP knowledge that I have, and laid the groundwork for me to imrpove at the collegeboard exams. It was also a good lesson learned that most frameworks don't work well with each other, and careful planning is paramount for a successful and cohesive project.