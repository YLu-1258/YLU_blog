---
title: JQUERY & CRUD HACKS
description: hacks for CRUD with JQUERY
week: 15
---

# Directions

- You really should try to answer the 5 questions below this without any help. These are core concepts that you should at least attempt to learn.
- The update JQUERY function may require a little help but try without first
- Hacks should only take 20 minutes at most

# Free Response and MCQ

1. What does CRUD stand for?
    - Create
    - Read
    - Update
    - Delete

2. What are the HTTP verbs that are associated with each CRUD action?
    - C - POST
    - R - GET
    - U - PUT
    - D - DELETE

3. What is JQuery?  
- JQuery is an JS library created to simplify the overall struture of HTML and JS and also the event handeling for certain HTTP requests that JS sends. It also enables developers to create asynchronous requests to better update web pages. It makes iteasier for us to manipulate the DOM 
4. Match A, B, and C into the JQuery event handler for a data table
    - A: 'click'
    - B: '.delete-btn'
    - C: '#data-table'

    $(C).on(A, B, function() {
    // code
  });

5. Why do we use JQUERY with CRUD?  
- We use JQuery with CRUD in order to make the CRUD operations on the frontend side much easier to manage and handle. It's dynamic syntax also makes it easier for us to access specific elements in the frontend, and do some pretty hacky stuff with it if we want to update multiple values at once with data from the backend. Doing so simplifies the frontend javascript into something much more human readable and logical.

POPCORN HACK:
talk about usage of one of four elements of CRUD from your project in tri 1. Focus on how CRUD was implemented.
- Our project last trimester was a demonstration of a pathfinding algorithm called "Dijkstra's Algorithm". The "R" of CRUD was used in our project whenever we sent a get request to the backend (along with some data) in order to retrieve the final graph that displayed the path from one node to another destination. This same feature was also used in order to store user accounts for a game that we had to find the most optimal path from one location to another.



# Finish the update JQUERY function
- its all the way at the end, you should see the green comment
- you can choose to use the two lines I've already given or not

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<style>

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }

  th, td {
    border: 1px solid #e66b8f; /* Barbie Pink */
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #ff8bbd; /* Barbie Pink */
    color: white;
  }

  button {
    background-color: #ff8bbd; /* Barbie Pink */
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e66b8f; /* Lighter Barbie Pink */
  }
</style>


<table id="data-table">
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    <!-- Data will be dynamically added here -->
  </tbody>
</table>

<button id="create-btn">Create Barbie Character</button>

<script>
  const initialData = [
    { id: 1, name: 'Barbie', email: 'barbie@example.com' },
    { id: 2, name: 'Ken', email: 'ken@example.com' }
  ];

  function renderData(data) {
    const tableBody = $('#data-table tbody');
    tableBody.empty();

    data.forEach(item => {
      const row = `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td>
            <button class="update-btn" data-id="${item.id}">Update</button>
            <button class="delete-btn" data-id="${item.id}">Delete</button>
          </td>
        </tr>
      `;
      tableBody.append(row);
    });
  }

  function createBarbieCharacter() {
    const newName = prompt('Enter the name of the Barbie character:');
    const newEmail = prompt('Enter the email of the Barbie character:');
    const newId = initialData.length + 1;
    
    const newData = [...initialData, { id: newId, name: newName, email: newEmail }];
    renderData(newData);
  }

  $('#create-btn').on('click', createBarbieCharacter);

  $('#data-table').on('click', '.delete-btn', function() {
    const idToDelete = $(this).data('id');
    const newData = initialData.filter(item => item.id !== idToDelete);
    renderData(newData);
  });

  $('#data-table').on('click', '.update-btn', function() {
    const idToEdit = $(this).data('id');
    const updateIndex = initialData.findIndex(item => item.id === idToEdit);
    const newName = prompt('Enter the updated name:');
    const newEmail = prompt('Enter the updated email:');
    if (updateIndex !== -1) {
      initialData[updateIndex].name = newName;
      initialData[updateIndex].email = newEmail;
      renderData(initialData);
    }
  });


  // Initial rendering
  renderData(initialData);
</script>

