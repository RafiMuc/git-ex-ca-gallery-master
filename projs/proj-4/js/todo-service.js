'use strict'
const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';
var gSortType = 'created-at'

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : [createTodo('Learn HTML'), createTodo('Practice CSS')]
}

function createTodo(txt, todoImportance) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date(),
        importance: todoImportance

    }
}

function getTodos() {
    return gTodos.filter(function (todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}

function sortTodos(todos) {
    if (gSortType === 'txt') {
        todos.sort(function (a, b) {
            if (a.txt < b.txt) return -1;
            else return 1;
        });
    }
    else if (gSortType === 'importance') {
        todos.sort(function (a, b) {
            if (a.importance < b.importance) return -1;
            else return 1;
        });
    }
    else {
        todos.sort(function (a, b) {
            if (a.createdAt < b.createdAt) return -1;
            else return 1;
        });
    }
    return todos;
}

function addTodo(todoTxt, todoImportance) {
    gTodos.unshift(createTodo(todoTxt, todoImportance));
    saveToStorage(KEY_TODOS, gTodos);

}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    gTodosFilter = statusFilter;
}

function setSortTodos(sortType) {
    gSortType = sortType;
}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    return gTodos.length;
}
function getActiveCount() {
    return gTodos.filter(function (todo) {
        return !todo.isDone
    }).length
}

