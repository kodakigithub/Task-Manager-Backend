

const mongoose = require ('mongoose')
//  mongodb url
mongoose.connect("mongodb+srv://kodaki:Harsh%40890@cluster0.vgb8u.mongodb.net/?retryWrites=true&w=majority")


const todoSchema = mongoose.Schema({
    
    task_id: Number,
    title: String,
    description: String,
    status: String,
    due_date: Date,
    created_at: Date,
    updated_at: Date,
    priority: String
})

const todo = mongoose.model("todos", todoSchema);

const taskIdSchema = mongoose.Schema({
    last_id: Number
});

const TaskId = mongoose.model("task_id", taskIdSchema);

module.exports = {
    todo,
    TaskId
}