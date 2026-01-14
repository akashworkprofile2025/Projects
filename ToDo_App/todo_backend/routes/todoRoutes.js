import express from "express";
import Todo from "../models/Todo.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* Get Todos */
router.get("/", protect, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

/* Create Todo */
router.post("/", protect, async (req, res) => {
  const todo = await Todo.create({
    title: req.body.title,
    user: req.user
  });

  res.status(201).json(todo);
});

/* Update Todo */
router.put("/:id", protect, async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todo.title = req.body.title ?? todo.title;
  todo.completed = req.body.completed ?? todo.completed;

  await todo.save();
  res.json(todo);
});

/* Delete Todo */
router.delete("/:id", protect, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
