
# Task Manager App

This is a RESTful API for managing tasks, built using **Node.js**, **Express**, and **MongoDB**. The API allows you to perform basic CRUD operations like create, update, delete, and retrieve tasks with some additional features like filtering and sorting by status, priority, and due date. Input validation is enforced using Zod.


## Run Locally

Clone the project

```bash
  git clone https://github.com/kodakigithub/Task-Manager-Backend.git
```

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  npm install
```

Deploy the express server
```bash
  node index.js
```

## Documentation

it performs five operations:

- **Creates a new Task** : Method: POST

URL: http://localhost:3000/tasks

Body: Select the "raw" option and set the body type to "JSON". Use the following template for the body:

{
  "title": "Task Title",
  "description": "Task Description",
  "due_date": "YYYY-MM-DD",  // Optional
  "status": "Pending",       // Optional, can be "Pending", "In-Progress", or "Done"
  "priority": "High"         // Optional, can be "Low", "Medium", or "High"
}
##

- **Deletes an existing Task** : 
Method: DELETE

URL: http://localhost:3000/tasks/:id

Headers: None required.

URL Parameter: Replace :id with the task ID you want to delete.
##

- **Updates an existing task** : 
Method: PUT

URL: http://localhost:3000/tasks/:id

Headers:

Content-Type: application/json
Body: Select the "raw" option and set the body type to "JSON". Use the following template for the body:
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "due_date": "YYYY-MM-DD",  // Optional
  "status": "In-Progress",   // Optional, can be "Pending", "In-Progress", or "Done"
  "priority": "Low"          // Optional, can be "Low", "Medium", or "High"
}

##

- **Retrieves all tasks** : Method: GET

URL: http://localhost:3000/tasks

Headers: None required.

Query Parameters: Optional

status: Filter by task status (Pending, In-Progress, Done).
sortBy: Sort tasks by a field (due_date, priority).
order: Sort order (asc for ascending, desc for descending).

##

- **Retrieves a specific task** : 
Method: GET

URL: http://localhost:3000/tasks/:id

Headers: None required.

URL Parameter: Replace :id with the task ID you want to retrieve.




## Features

- Creation of a new task
- Updation of an existing task
- Retrieval of all existing tasks
    - Sort by Due Date
    - Filter by Status
- Retrieval of a specific task
- Deletion of a specific task


