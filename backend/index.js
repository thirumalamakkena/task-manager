const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const pathToDatabase = path.join(__dirname, "database.db");

let db = null;

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

const initialTaskListContent = [
  {
    id: uuidv4(),
    color: "blue",
    status: "To Do",
  },
  {
    id: uuidv4(),
    color: "orange",
    status: "On Progress",
  },
  {
    id: uuidv4(),
    color: "green",
    status: "Done",
  },
];

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: pathToDatabase,
      driver: sqlite3.Database,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

const arrangeTasksByStatus = (tasks) => {
  const statuses = ["To Do", "On Progress", "Done"];
  const arranged = statuses.map((status, i) => ({
    id: initialTaskListContent[i].id,
    color: initialTaskListContent[i].color,
    status,
    tasks: [],
  }));

  tasks.forEach((task) => {
    const index = statuses.indexOf(task.status);
    if (index !== -1) {
      arranged[index].tasks.push({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        taskPriority: task.task_priority,
        deadline: task.deadline,
      });
    }
  });

  return arranged;
};

app.get("/", (req, res) => {
  res.send("Welcome to the backend server!");
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await db.all("SELECT * FROM tasks");
    res.status(200);
    // Convert tasks to the desired format
    
    res.send(arrangeTasksByStatus(tasks));
  } catch (error) {
    console.error(`Error fetching tasks: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const {
    deadline,
    status = "To Do",
    task_priority = "Low",
    title,
    description,
    taskId = uuidv4(),
  } = req.body;
  try {
    const query = `
        INSERT INTO tasks (id, title, description, status, task_priority, deadline)
        VALUES (
            '${taskId}',
            '${title}',
            '${description}',
            '${status}',
            '${task_priority}',
            '${deadline}'
        )`;
    await db.run(query);
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error(`Error adding task: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;
  const { status, task_priority, title, description, deadline } = req.body;

  try {
    const query = `
      UPDATE tasks
      SET status = '${status}', task_priority = '${task_priority}', title = '${title}', description = '${description}', deadline = '${deadline}'
      WHERE id = '${taskId}'`;
    await db.run(query);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(`Error updating task: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/tasks/:taskId", async (req, res) => {
  const { taskId } = req.params;

  try {
    const query = `DELETE FROM tasks WHERE id = '${taskId}'`;
    await db.run(query);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(`Error deleting task: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
