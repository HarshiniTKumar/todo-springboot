import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/tasks");

    setTasks(response.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (title.trim() === "") return;

    await axios.post("http://localhost:8080/tasks", {
      title,
      completed: false,
    });

    setTitle("");

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/tasks/${id}`);

    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await axios.put(`http://localhost:8080/tasks/${task.id}`, {
      ...task,
      completed: !task.completed,
    });

    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditedTitle(task.title);
  };

  const saveEdit = async (task) => {
    if (editedTitle.trim() === "") return;

    await axios.put(`http://localhost:8080/tasks/${task.id}`, {
      ...task,
      title: editedTitle,
    });

    setEditingId(null);
    setEditedTitle("");

    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") {
      return task.completed && matchesSearch;
    }

    if (filter === "pending") {
      return !task.completed && matchesSearch;
    }

    return matchesSearch;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <div className="todo-container">
        <div className="header">
          <h1>✨To-Do✨</h1>

          <p>{new Date().toDateString()}</p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>{tasks.length}</h3>
            <p>Total</p>
          </div>

          <div className="stat-card">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Add a task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>Add</button>
        </div>

        <input
          className="search-bar"
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filters">
          <button onClick={() => setFilter("all")}>All</button>

          <button onClick={() => setFilter("completed")}>Completed</button>

          <button onClick={() => setFilter("pending")}>Pending</button>
        </div>

        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">No tasks found</div>
          ) : (
            filteredTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <div className="task-left">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                  />

                  {editingId === task.id ? (
                    <input
                      className="edit-input"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  ) : (
                    <span className={task.completed ? "completed" : ""}>
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="task-buttons">
                  {editingId === task.id ? (
                    <button className="save-btn" onClick={() => saveEdit(task)}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
