import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ allTasks, deleteTask, editTask }) {
  return (
    <div>
      {allTasks.map((task) => (
        <TodoItem key={task._id} task={task} deleteTask={deleteTask} editTask={editTask} />
      ))}
    </div>
  );
}

export default TodoList;
