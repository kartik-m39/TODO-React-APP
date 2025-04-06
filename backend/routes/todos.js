const express = require('express');
const { fetchTodo, addTodo, deleteTodo, toggleComplete } = require('../controller/todo');
const router = express.Router();

router.get("/fetch", fetchTodo);
router.post("/add", addTodo);
router.delete("/delete/:id", deleteTodo);
router.patch("/toggle/:id", toggleComplete);

module.exports = router;