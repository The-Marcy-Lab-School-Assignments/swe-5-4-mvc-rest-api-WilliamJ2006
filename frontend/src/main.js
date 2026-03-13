import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './fetch-helpers.js';
import { renderTodos, renderError } from './dom-helpers.js';

const loadTodos = async () => {
  const { data, error } = await getTodos();
  if (error) return renderError(error.message);
  renderError();
  renderTodos(data);
};

// Handle Form Submissions
const handleAddTodo = async (e) => {
  e.preventDefault();
  const input = document.querySelector('#todo-task-input');
  const task = input.value.trim();
  if (!task) return;

  const { error } = await createTodo(task);
  if (error) return renderError(error.message);

  input.value = '';
  await loadTodos();
};

// Handle Delete and Toggle Clicks
const handleTodosListClick = async (e) => {
  const clickedListItem = e.target.closest('li');
  if (!clickedListItem) return;

  const id = clickedListItem.dataset.id;

  // Handle Delete Clicks
  if (e.target.classList.contains('delete-btn')) {
    const { error } = await deleteTodo(id);
    if (error) return renderError(error.message);
    await loadTodos();
  }

  // Handle Checkbox Toggle
  if (e.target.classList.contains('toggle-btn')) {
    const isDone = e.target.checked;
    const { error } = await updateTodo(id, { isDone });
    if (error) return renderError(error.message);
    await loadTodos();
  }
};

// Add Event Listeners
document
  .querySelector('#add-todo-form')
  .addEventListener('submit', handleAddTodo);
document
  .querySelector('#todos-list')
  .addEventListener('click', handleTodosListClick);

// Load Todos on Page Load
loadTodos();
