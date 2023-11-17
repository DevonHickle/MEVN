const { Router } = require('express');
const Todo = require('../../models/Todo');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        if (!todos) throw new Error('Nothing To Do!');
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body) 
    try {
        const todo = await newTodo.save();
        if (!todo) throw new Error('Error saving note');
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const removed = await Todo.findByIdAndDelete();
        if (!removed) throw new Error('Error deleting note');
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;