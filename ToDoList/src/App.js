import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []); 

  async function fetchTodos() {
    try {
      const response = await axios.get('http://localhost:8080/');
      setAllTasks(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }

  async function addTask(task) {
    try {
      await axios.post("http://localhost:8080/add", { task });
      fetchTodos();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  async function editTask(id, updatedTask) {
    try {
      await axios.put(`http://localhost:8080/tasks/${id}`, { task: updatedTask });
      fetchTodos();
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }

  return (
    <div className='container'>
      <div className='App'>
        <TodoForm addTask={addTask} />
        <TodoList allTasks={allTasks} deleteTask={deleteTask} editTask={editTask} />
      </div>
    </div>
  );
}

export default App;
