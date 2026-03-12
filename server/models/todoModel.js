const getId = ((id = 0) => () => ++id)();

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////

// Can be used like "fellowModel.create()"
module.exports.list = () => {
  return [...todos];
};

module.exports.find = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return null;
  }
  return { ...todo };
};

module.exports.create = (task) => {
  const newTodo = { id: getId(), task: task, isDone: false };
  todos.push(newTodo);
  return newTodo;
};

module.exports.update = (id, isDone) => {
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return null;
  todo.isDone = isDone;
  return { ...todo };
};

module.exports.destroy = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    return false;
  }
  todos.splice(todoIndex, 1);
  return true;
};