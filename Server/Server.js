const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const TodoModel = require('./Models/TodoModel');
const connectDB = require('./Connection');
const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    console.log(todos); 
    res.status(200).json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    res.status(500).send({ error: 'Failed to fetch todos' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      throw new Error('Missing task property in request body');
    }
    await TodoModel.create({ task });
    res.status(200).send({ msg: 'Task added successfully' });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(400).send({ error: err.message || 'Failed to add task' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await TodoModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task } = req.body;
    if (!task) {
      throw new Error('Missing task property in request body');
    }
    const updatedTask = await TodoModel.findByIdAndUpdate(taskId, { task }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});
  
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
