import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = async () => {
    const res = await fetch(`${API}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await fetch(`${API}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
    setText("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, { method: "PUT" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>TaskPulse</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleTask(t.id)}
              style={{
                textDecoration: t.completed ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTask(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;