## Task Breakdown 


# 1. Task Model:

  Create a task model with the following fields:
-task_id
-title
-description
-status(Done, Pending, In-Progress)
-due_date
-created_at
-updated_at
-priority(BONUS TASK)
  -Update the database with the following schema also.

# 2. API Endpoints:

-Creating tasks: POST/tasks
-Fetching all tasks or a specific task by ID: GET/tasks and GET/tasks/{id}
-Updating an existing task: PUT/tasks/{id}
-Deleting a task: DELETE/tasks/{id}
     Ensure that the API can handle task creation, retrieval, updates, and deletions effectively.
   
# 3. Task Sorting and Filtering:

-Add functionality to filter tasks based on their status (e.g., "In Progress", "Done").
-Allow tasks to be sorted by due date, creation date, or priority (if implemented).
