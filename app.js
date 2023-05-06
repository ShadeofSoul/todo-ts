const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".btn-submit");
const todoList = document.querySelector(".todo-list");
const filterOptions = document.getElementsByName("filter");

buildtodo();
filterTodos();

todoButton.addEventListener("click", addTodo);

todoList.addEventListener("click", handleTodoClick);
filterOptions.forEach((item) => {
  item.addEventListener("click", filterTodos);
});

function handleTodoClick(event) {
  event.preventDefault();
  const todo = event.target.parentElement;
  if (event.target.classList.contains("todo-delete")) {
    deleteTodo(todo);
  } else if (event.target.classList.contains("todo-completed")) {
    markTodo(todo);
  }
}

function deleteTodo(todo) {
  todo.classList.add("rotate-fade");
  todo.addEventListener("transitionend", () => {
    removeTodoFromAPI(todo);
    todo.remove();
  });
}

function buildtodolist(todo) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `<p class="todo-content">${todo.title}</p><button aria-label="mark complete" class="todo-completed">✓</button><button class="todo-delete">-</button>`;
  todoItem.dataset.id = todo.id;
  todo.completed ? todoItem.classList.add("completed") : null;
  todoList.appendChild(todoItem);
}

function addTodo(event) {
  event.preventDefault();
  if (todoInput.value !== "") {
    const newTodo = {
      title: todoInput.value,
      completed: false,
    };
    addTodoToAPI(newTodo);
    buildtodolist(newTodo);
  } else {
    alert("try again");
  }
  todoInput.value = "";
}

async function markTodo(todo) {
  todo.children[0].focus();
  todo.classList.toggle("completed");
  const isCom = todo.classList.contains("completed");
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.dataset.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: isCom }),
    }
  );
  const todoList = await res.json();
  console.log(todoList);
}

async function buildtodo() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const currentList = await res.json();
  currentList.forEach((item) => {
    buildtodolist(item);
  });
}

async function addTodoToAPI(todo) {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const todoList = await res.json();
  console.log(todoList);
}

async function removeTodoFromAPI(todo) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todo.dataset.id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const todoList = await res.json();
  console.log(todoList);
}

////////////////////// FIlter ///////////////////////////////
function filterTodos() {
  const value = this.value || "all";
  const todoListItems = document.querySelectorAll(".todo-item");
  todoListItems.forEach((item) => {
    item.value === value ? (item.checked = true) : (item.checked = false);
  });
  switch (value) {
    case "all":
      todoListItems.forEach((item) => {
        item.style.display = "grid";
      });
      break;
    case "completed":
      todoListItems.forEach((item) => {
        !item.classList.contains("completed")
          ? (item.style.display = "none")
          : (item.style.display = "grid");
      });
      break;
    case "uncompleted":
      todoListItems.forEach((item) => {
        item.classList.contains("completed")
          ? (item.style.display = "none")
          : (item.style.display = "grid");
      });
      break;

    default:
      todoListItems.forEach((item) => {
        item.style.display = "grid";
      });
      break;
  }
}
