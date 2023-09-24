const db = require("../db");
exports.getTodos = async () => {
    return await db.any('SELECT * FROM todos ORDER BY "id"');
}

exports.addTodo = async (description) => {
    return await db.one('INSERT INTO todos("description", "isDone") VALUES($1, $2) RETURNING *', [description, false])
}

exports.updateTodo = async (id, description, isDone) => {
    return await db.none('UPDATE todos SET "description" = $2, "isDone" = $3 WHERE id = $1;', [id, description, isDone])
}

exports.removeTodo = async (id) => {
    return await db.none('DELETE FROM todos WHERE id = $1', [id])
}