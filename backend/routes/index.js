const todosRoutes = require('./todos');

exports.loadRoutes = (app) => {
  app.use('/api/todos', todosRoutes);
};
