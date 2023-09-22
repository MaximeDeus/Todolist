const db = require("../db");
exports.getTodos = async () => {
    return await db.any('SELECT * FROM todos');
}

exports.addTodo = async (description) => {
    return await db.one('INSERT INTO todos("description", "isDone") VALUES($1, $2) RETURNING *', [description, false])
}

exports.removeTodo = async (id) => {
    return await db.none('DELETE FROM todos WHERE id = $1', [id])
}