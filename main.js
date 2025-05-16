function saveNote() {
  localStorage.setItem('focusnote_note', document.getElementById('note').value);
}
function loadNote() {
  document.getElementById('note').value = localStorage.getItem('focusnote_note') || '';
}
function saveTodos() {
  localStorage.setItem('focusnote_todos', JSON.stringify(todos));
}
function loadTodos() {
  todos = JSON.parse(localStorage.getItem('focusnote_todos') || '[]');
}
function renderTodos() {
  const ul = document.getElementById('todoList');
  ul.innerHTML = todos.map((t,i) =>
    `<li class="${t.done?'done':''}">
      <input type="checkbox" onclick="toggleTodo(${i})"${t.done?' checked':''}>
      <span>${t.text}</span>
      <button onclick="delTodo(${i})">x</button>
    </li>`
  ).join('');
}
function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if(text) {
    todos.push({text, done:false});
    input.value = '';
    saveTodos();
    renderTodos();
  }
}
function delTodo(i) {
  todos.splice(i,1);
  saveTodos();
  renderTodos();
}
function toggleTodo(i) {
  todos[i].done = !todos[i].done;
  saveTodos();
  renderTodos();
}
function clearAll() {
  if(confirm('Clear all notes and to-dos?')) {
    localStorage.removeItem('focusnote_note');
    localStorage.removeItem('focusnote_todos');
    loadNote();
    loadTodos();
    renderTodos();
  }
}
function toggleTheme() {
  document.body.classList.toggle('dark');
  localStorage.setItem('focusnote_theme', document.body.classList.contains('dark')?'dark':'');
}
let todos = [];
window.onload = () => {
  if(localStorage.getItem('focusnote_theme')==='dark') document.body.classList.add('dark');
  loadNote();
  loadTodos();
  renderTodos();
};
