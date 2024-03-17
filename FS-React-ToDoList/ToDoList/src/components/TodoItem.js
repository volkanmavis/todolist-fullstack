import React, { useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { FaRegEdit } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

function TodoItem({ task, deleteTask, editTask }) {
  const [completed, setCompleted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState(task.task);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };
    
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
  
  const handleEdit = () => {
    setEditMode(true);
  }
  
  const handleTaskChange = (e) => {
    setEditedTask(e.target.value);
  }
  
  const handleSaveEdit = async () => {
    try {
      await editTask(task._id, editedTask);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving edited task:', error);
    }
  }

  return (
    <div className='todo-item'>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
        {editMode ? (
          <input className='edit-input'
            type="text"
            value={editedTask}
            onChange={handleTaskChange}
          />
        ) : (
          <span style={ completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
            {task.task}
          </span>
        )}
        {!editMode && <FaRegEdit className='edit' onClick={handleEdit} />}
        {!editMode && <CloseButton onClick={handleDelete} id='close-button' />}
        {editMode && <GiConfirmed className='save-button' onClick={handleSaveEdit}/>}
    </div>
  )
}

export default TodoItem;
