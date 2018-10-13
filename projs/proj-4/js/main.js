'use strict'

// This is our controller it is responsible for rendering the view and action upon events
console.log('Todo');

function init() {
    createTodos();
    render();
}

function render() {
    if (gTodos.length === 0) showEmptyListSign();
    else hideEmptyListSign();
    renderTodos();
    renderStats();
}

function renderTodos() {
    var todos = sortTodos(getTodos());
    var strHtmls = todos.map(function (todo) {
        return `<tr class="${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')"><td>
                   ${todo.txt}</td><td>${getTimeStamp(todo.createdAt)}</td><td>${todo.importance}</td>
                   <td><button class="btn-delete" onclick="onDeleteTodo('${todo.id}', event)">
                      &times;
                    </button></td>
                </tr>`;
    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    render();
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter);
    render();
}

function onSetSort(sortType) {
    setSortTodos(sortType);
    render();
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt');
    var elNewTodoImportance = document.querySelector('#newTodoImportance');
    var newTodoTxt = elNewTodoTxt.value;
    var newTodoImportance = elNewTodoImportance.value;
    if (newTodoTxt.trim().length === 0) {
        alert('Please type a Todo...');
        return;
    }
    addTodo(newTodoTxt, newTodoImportance);

    document.querySelector('h4').classList.add('animated', 'tada');
    setTimeout(function () {
        document.querySelector('h4').classList.remove('animated', 'tada');
    }, 1000)

    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    // Stop the propegation of the click event so the LI onclick will not trigger
    ev.stopPropagation();
    if (!confirm('Sure you want to delete this ToDo?')) return;
    deleteTodo(todoId);
    render();
}

function showEmptyListSign() {
    document.querySelector('.empty-list').classList.add('show');
}

function hideEmptyListSign() {
    document.querySelector('.empty-list').classList.remove('show');
}