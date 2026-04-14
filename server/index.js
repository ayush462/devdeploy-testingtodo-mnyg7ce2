const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

// TEST ROUTE (very important)
app.get("/", (req, res) => {
  res.send("Server is working");
});

// ✅ GET tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// ✅ ADD task
app.post("/api/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  tasks.push(task);
  res.json(task);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});