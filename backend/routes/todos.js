const express = require('express');

const router = express.Router();
const todosCtrl = require('../controllers/todos');

router.get('/', todosCtrl.getTodos);
router.post('/', todosCtrl.addTodo);
router.delete('/:id', todosCtrl.removeTodo);
module.exports = router;
