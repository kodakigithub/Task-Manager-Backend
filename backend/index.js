const express = require('express');
const { createTodo, updateTodo} = require('./types');
const { todo, TaskId } = require('./db');
const app = express();

app.use(express.json());

//generates the task_id variable for every task
const getNextTaskId = async () => {
    let taskIdDoc = await TaskId.findOne();
    if (!taskIdDoc) {
        taskIdDoc = new TaskId({ last_id: 1 });
        await taskIdDoc.save();
        return 1;
    }
    const nextId = taskIdDoc.last_id + 1;
    taskIdDoc.last_id = nextId;
    await taskIdDoc.save();
    return nextId;
};   

const CurrDate = new Date();

// post route to create a new task
app.post("/tasks", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    
    if (!parsedPayload.success) {
        res.status(400).json({
            msg: "Your input is invalid",
            errors: parsedPayload.error.errors
        });
        return;
    }
    
    try {
        const task_id = await getNextTaskId();

        const newTask = await todo.create({
            task_id,
            title: createPayload.title,
            description: createPayload.description,
            status: "Pending",
            due_date: createPayload.due_date || null,
            created_at: CurrDate,
            updated_at: CurrDate,
            priority: createPayload.priority || null
        });

        res.status(201).json({
            msg: "Task created",
            task: newTask
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error creating task",
            error: error.message
        });
    }
});

// get route to give all tasks and sorting and filtering logic
app.get("/tasks", async function(req, res) {
    const { status, sortBy, order } = req.query;
    let query = {};
    let sort = {};

    if (status) {
        query.status = status;
    }

    if (sortBy) {
        sort[sortBy] = order === 'desc' ? -1 : 1;
    }

    try {
        const todos = await todo.find(query).sort(sort);
        res.json({ todos });
    } catch (error) {
        res.status(500).json({
            msg: "Error fetching tasks",
            error: error.message
        });
    }
});

// put route for task updation
app.put("/tasks/:id", async function(req, res) {
    const createPayload = req.body;
    
    // to solve input validation of due date variable
    if (createPayload.due_date) {
        const parsedDate = new Date(createPayload.due_date);

        // Check if it's a valid date
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({
                msg: "Invalid date format",
                errors: [{
                    path: ["due_date"],
                    message: "The due_date provided is not valid"
                }]
            });
        } else {
            createPayload.due_date = parsedDate.toISOString().split('T')[0]; // Convert to YYYY-MM-DD string
        }
    }

    
    //input validation
    const parsedPayload = updateTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(400).json({
            msg: "Your input is invalid",
            errors: parsedPayload.error.errors
        });
        return; 
    }
    try {
        const task_id = parseInt(req.params.id, 10);

        // finds and updates the function
        const result = await todo.findOneAndUpdate(
            { task_id: task_id },
            {
                ...createPayload,
                updated_at: CurrDate
            },
            { new: true } //ensures it returns the updated function
        );

        if (!result) {
            return res.status(404).json({
                msg: "Task not found"
            });
        }
        res.json({
            msg: "Task updated successfully",
            task: result
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error updating the task",
            error: error.message
        });
    }
});

//get route to retrieve a specific task
app.get('/tasks/:id', async (req, res) => {
    const task_id = parseInt(req.params.id, 10);
    
    try {
        const task = await todo.findOne({task_id: task_id}).lean();

        if (!task) {
            return res.status(404).json({
                msg: "Task not found"
            });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({
            msg: "Error retrieving the task",
            error: error.message,
        });
    }
});

// delete a specific task
app.delete('/tasks/:id', async (req, res) => {
    const task_id = parseInt(req.params.id, 10);

    try {
        const result = await todo.findOneAndDelete({ task_id: task_id });

        if (!result) {
            return res.status(404).json({
                msg: "Task not found"
            });
        }

        res.json({
            msg: "Task deleted successfully",
            task: result
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error deleting the task",
            error: error.message
        });
    }
})


app.listen(3000);
