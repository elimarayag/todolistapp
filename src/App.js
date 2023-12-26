import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const updateTask = (taskId, newText) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, text: newText } : task
      )
    );
    setEditableTaskId(null);
    setEditedTaskText("");
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setEditableTaskId(null);
    setEditedTaskText("");
  };

  const startEditing = (taskId, taskText) => {
    setEditableTaskId(taskId);
    setEditedTaskText(taskText);
  };

  return (
    <div className="App">
      <div className="inputBox">
        <h1>To-Do List</h1>
        <div className="inputContainer">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      {tasks.length > 0 && (
        <div className="taskListBox">
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {editableTaskId === task.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedTaskText}
                      onChange={(e) => setEditedTaskText(e.target.value)}
                    />
                    <button onClick={() => updateTask(task.id, editedTaskText)}>
                      Update
                    </button>
                  </div>
                ) : (
                  <div>
                    <span>{task.text}</span>
                    <button onClick={() => startEditing(task.id, task.text)}>
                      Edit
                    </button>
                  </div>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
