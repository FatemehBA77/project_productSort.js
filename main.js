// let todos = [];
let filterValue = "all";
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilter = document.querySelector(".filter-todos");
const editBtn = document.querySelector(".todo__edit");
const inputModal = document.querySelector(".title");
const deleteModal = document.querySelector(".modal-delete");
const completeModal = document.querySelector(".modal-comfirm");

todoForm.addEventListener("submit", addNewTodo);
deleteModal.addEventListener("click", removeTodo);
document.addEventListener("DOMContentLoaded", (e) => {
  const todos = getAllTodos();
  createTodo(todos);
});
selectFilter.addEventListener("change", (e) => {
  filterValue = e.target.value;
  filtersTodos();
});
function addNewTodo(e) {
  e.preventDefault(); // از رفرش شدن دیفالت فرم جلوگیری میکند
  if (!todoInput.value) {
    alert("please fill input!!");
    return null;
  }
  const newTodo = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todoInput.value,
    isCompleted: false,
  };
  // todos.push(newTodo);
  saveTodo(newTodo);
  filtersTodos();
}
function createTodo(todos) {
  let result = "";
  todos.forEach((todo) => {
    result += `<li class="todo">
  <p class="todo__title ${todo.isCompleted && "compleleted"}">${todo.title}</p>
    <span class="todo__createAt">${new Date(todo.createdAt).toLocaleDateString(
      "fa-Ir"
    )}</span>
    <button class="todo__check" data-todo-id=${
      todo.id
    }><i class="fas fa-check-square"></i></button>
    <button class="todo__edit" data-todo-id=${
      todo.id
    }><i class="fas fa-edit"></i></button>
    <button class="todo__remove" data-todo-id=${
      todo.id
    }><i class="fa fa-trash"></i></button>
  </li>`;
  });
  todoList.innerHTML = result;
  todoInput.value = "";
  const remoeBtn = [...document.querySelectorAll(".todo__remove")];
  remoeBtn.forEach((btn) => btn.addEventListener("click", removeTodo));

  const checkBtn = [...document.querySelectorAll(".todo__check")];
  checkBtn.forEach((btn) => btn.addEventListener("click", checkTodo));
  const editBtn = [...document.querySelectorAll(".todo__edit")];
  editBtn.forEach((btn) =>
    btn.addEventListener("click", (e) => {
      console.log(btn);
      const todoId = Number(btn.dataset.todoId);
      const todos = getAllTodos();
      const todo = todos.find((t) => t.id === todoId);
      console.log(todo);
      inputModal.value = todo.title;
      showModalEdit();
      completeModal.addEventListener("click", (e) => {
        const todoId = Number(btn.dataset.todoId);
        const todos = getAllTodos();
        const todo = todos.find((t) => t.id === todoId);
        todo.title = inputModal.value;
        saveAllTodo(todos);
      });
    })
  );
}
function showModalEdit(e) {
  const ShowModals = document.querySelector(".modal");
  ShowModals.style.opacity = 1;
  ShowModals.style.transform = "translateY(-75px)";
  const backDrop = document.querySelector(".back-drop");
  backDrop.style.display = "block";
  const comfirmModal = document.querySelector(".modal-comfirm");
  comfirmModal.addEventListener("click", comfirmModalFunc);
  const closeModal = document.querySelector(".modal-delete");
  closeModal.addEventListener("click", closeModalFunc);
}
function editInput() {}
function closeModalFunc() {
  const ShowModals = document.querySelector(".modal");
  ShowModals.style.opacity = 1;
  ShowModals.style.transform = "translateY(-100vh)";
  const backDrop = document.querySelector(".back-drop");
  backDrop.style.display = "none";
}
function comfirmModalFunc() {
  const ShowModals = document.querySelector(".modal");
  ShowModals.style.opacity = 1;
  ShowModals.style.transform = "translateY(-100vh)";
  const backDrop = document.querySelector(".back-drop");
  backDrop.style.display = "none";
  alert("your information regest");
}

function removeTodo(e) {
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  todos = todos.filter((t) => t.id !== todoId);
  saveAllTodo(todos);
  filtersTodos();
}
function checkTodo(e) {
  const todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const todo = todos.find((t) => t.id === todoId);
  todo.isCompleted = !todo.isCompleted;
  saveAllTodo(todos);
  filtersTodos();
}
function filtersTodos() {
  // const filter = e.target.value;
  const todos = getAllTodos();
  switch (filterValue) {
    case "all": {
      createTodo(todos);
      break;
    }
    case "completed": {
      const filterTodo = todos.filter((t) => t.isCompleted);
      createTodo(filterTodo);
      break;
    }
    case "uncompleted": {
      const filterTodo = todos.filter((t) => !t.isCompleted);
      createTodo(filterTodo);
      break;
    }
    default:
      createTodo(todos);
  }
}
function getAllTodos() {
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  return savedTodos;
}
function saveTodo(todo) {
  const savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos", JSON.stringify(savedTodos));
  return savedTodos;
}
function saveAllTodo(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}
