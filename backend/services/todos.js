const db = require('../db');

exports.getTodos = async () => db.any('SELECT * FROM todos ORDER BY "id"');

exports.addTodo = async (description) => db.one(
  'INSERT INTO todos("description", "isDone") VALUES($1, $2) RETURNING *',
  [description, false],
);

exports.updateTodo = async (id, description, isDone) => db.none(
  'UPDATE todos SET "description" = $2, "isDone" = $3 WHERE id = $1;',
  [id, description, isDone],
);

exports.removeTodo = async (id) => db.none(
  'DELETE FROM todos WHERE id = $1',
  [id],
);
