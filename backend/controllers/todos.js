const todosService = require('../services/todos');

exports.getTodos = (async (req, res, next) => {
  try {
    const result = await todosService.getTodos();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

exports.addTodo = (async (req, res, next) => {
  try {
    const { description } = req.body;
    const todo = await todosService.addTodo(description);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
});
