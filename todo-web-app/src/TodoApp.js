import React, { useState } from 'react';
import './TodoApp.css';

function TodoApp({ todos, saveTodos }) {
  const [task, setTask] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      const newTasks = [...todos, { id: Date.now(), text: task.trim() }];
      saveTodos(newTasks);
      setTask('');
    }
  };

  const deleteTask = (id) => {
    const newTasks = todos.filter(task => task.id !== id);
    saveTodos(newTasks);
  };

  return (
    <div className="todo-container">
      <h1 className="title">Space Tasks</h1>
      <form onSubmit={addTask} className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="add-button">Add</button>
      </form>
      <ul className="task-list">
        {todos.map((item) => (
          <li key={item.id} className="task-item">
            <span className="task-text">{item.text}</span>
            <button className="delete-button" onClick={() => deleteTask(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;