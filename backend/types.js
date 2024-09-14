const zod = require('zod');

const createTodo = zod.object({
    title: zod.string().min(1, "Title required"),
    description: zod.string().min(1, "Description required"),
    due_date: zod.string().optional().refine(val => !val || !isNaN(new Date(val)), {
        message: "Invalid date format"
    }),
    status: zod.enum(['Done', 'Pending', 'In-Progress']).optional(),
    priority: zod.enum(['Low', 'Medium', 'High']).optional()
});

const updateTodo = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    due_date: zod.string().optional().refine(val => !val || !isNaN(new Date(val)), {
        message: "Invalid date format"
    }),
    status: zod.enum(['Done', 'Pending', 'In-Progress']).optional(),
    priority: zod.enum(['Low', 'Medium', 'High']).optional()
});

module.exports = {
    createTodo,
    updateTodo
};