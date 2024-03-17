import React, { useState } from 'react';
import '/Users/volkanmavis/Desktop/FS-React-ToDoList/ToDoList/src/add-button.css'

function TodoForm({ addTask }) {
    const [task, setTask] = useState("");

    const handleAddTodo = async (event) => {
      event.preventDefault();
      if (task.trim().length === 0) {
        return;
      }
      addTask(task);
      setTask("");
    };

    return (
        <div className='todo-form'>
            <input
                type="text"
                placeholder='Please add a task'
                onChange={(e) => setTask(e.target.value)}
                value={ task }
                id='task-input'
            />
            <button onClick={handleAddTodo} className='button-19'>+</button>
        </div>
    );
}

export default TodoForm;
