const todosService = require('../services/todos');

exports.getTodos = (async (req, res, next) => {
  try {
    const result = await todosService.getTodos();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});
