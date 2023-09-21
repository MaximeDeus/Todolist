const express = require('express');

const router = express.Router();
const todosCtrl = require('../controllers/todos');

router.get('/', todosCtrl.getTodos);
module.exports = router;
