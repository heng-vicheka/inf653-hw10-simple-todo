require("dotenv").config();
const path = require("path");
const express = require("express");
const { engine } = require("express-handlebars");
const methodOverride = require("method-override");
const createDatabaseProvider = require("./lib/database/createDatabaseProvider");

const app = express();
const port = process.env.PORT || 3000;

app.disable("x-powered-by");

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

const db = createDatabaseProvider();

app.get("/", async (req, res, next) => {
  try {
    const todos = await db.getTodos();
    res.render("index", { todos });
  } catch (err) {
    next(err);
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const text = (req.body.text || "").trim();
    if (text) await db.createTodo(text);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

app.post("/todos/:id/toggle", async (req, res, next) => {
  try {
    const { id } = req.params;
    const current = req.body.completed === "true";
    await db.updateTodo(id, { completed: !current });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

app.post("/todos/:id/update", async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = (req.body.text || "").trim();
    if (text) await db.updateTodo(id, { text });
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

app.post("/todos/:id/delete", async (req, res, next) => {
  try {
    await db.deleteTodo(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});

db.connect()
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on http://localhost:" + port);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });
