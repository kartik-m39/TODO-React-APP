const { Todo } = require("../model/todo");

async function fetchTodo(req, res) {
  const findTodo = await Todo.find({ userId: req.userid });
  if (!findTodo) {
    return res.status(500).json({ message: "Internal Server Error" });
  }

  return res.json(findTodo);
}

async function addTodo(req, res) {
  const { description, completed } = req.body;

  if (!description) {
    return res.status(400).json({ message: "Missing requiring fields" });
  }

  try {
    const createTodo = await Todo.create({
      description: description,
      completed: completed,
      userId: req.userid,
    });

    return res.status(201).json({todo: createTodo, message: "Added todo successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Failed to create project" });
  }
}

async function deleteTodo(req, res) {
  const todoId = req.params.id;
  const deleteTodo = await Todo.findOneAndDelete({
    _id: todoId,
    userId: req.userid,
  });

  if (!deleteTodo) {
    return res.status(404).json({ message: "Todo not found or unauthorized" });
  }

  return res.status(200).json({ message: "Todo deleted successfully" });
}

async function toggleComplete(req,res){

    const todoId = req.params.id;

    const todo = await Todo.findOne({_id: todoId, userId: req.userid})

    const toggle = await Todo.findOneAndUpdate({_id: todoId, userId: req.userid}, {completed: !todo.completed}, {new: true}) // new: true returns the updated document instead of original one

    if(!toggle){
        return res.status(404).json({message: "Error toggling todo"});
    }

    return res.status(200).json({message: "Toggled Completed", todo: toggle})
}

module.exports = {
  addTodo,
  fetchTodo,
  deleteTodo,
  toggleComplete,
};
