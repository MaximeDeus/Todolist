const db = require("../db");
exports.getTodos = async () => {
    return await db.any('SELECT * FROM todos');
}