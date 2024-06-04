const taskInput = document.querySelector(".task-input");
const addBtn = document.querySelector(".add-task-btn");
const error = document.querySelector(".error");
const emptyList = document.querySelector(".empty-ul-list");
const ulList = document.querySelector(".ul-list");
const editPanel = document.querySelector(".edit-container");
const editInput = document.querySelector(".edit-input");
const saveEditBtn = document.querySelector(".save-edit-btn");
const cancelEditBtn = document.querySelector(".cancel-edit-btn");
const allLi = document.getElementsByTagName("li");
const editError = document.querySelector(".edit-panel-error");
let idNumber = 0;
let editedTodo;

const saveToLS = () => {
  const tasks = [];

  ulList.querySelectorAll("li").forEach((li) => {
    const task = {
      id: li.id,
      content: li.querySelector(".content").textContent,
      done: li.querySelector(".content").classList.contains("done-task"),
    };
    tasks.push(task);
  });
  localStorage.setItem("taksk", JSON.stringify(tasks));
};

const loadTasksFromLS = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const newLi = document.createElement("li");
    newLi.classList.add("li-task");
    newLi.setAttribute("id", task.id);
    const newP = document.createElement("p");
    newP.classList.add("content");
    if (task.done) {
      newP.classList.add("done-task");
    }

    newP.textContent = task.content;

    const div = document.createElement("div");
    div.classList.add("task-icons");
    iconDiv(div);

    newLi.append(newP, div);
    ulList.appendChild(newLi);
  });
};

const addTask = () => {
  if (taskInput.value !== "") {
    idNumber++;
    const newLi = document.createElement("li");
    newLi.classList.add("li-task");
    newLi.setAttribute("id", `${idNumber}`);
    const content = document.createElement("p");
    content.classList.add("content");
    content.textContent = taskInput.value;

    const div = document.createElement("div");
    div.classList.add("task-icons");
    iconDiv(div);

    newLi.append(content, div);
    ulList.appendChild(newLi);
    taskInput.value = "";
    error.classList.add("hidden");
    emptyList.classList.add("hidden");
    saveToLS();
  } else {
    error.classList.remove("hidden");
  }
};

const iconDiv = (div) => {
  const doneIcon = document.createElement("div");
  doneIcon.classList.add("done-icon");
  doneIcon.innerHTML = '<i class="fa-solid fa-check"></i>';

  const editIcon = document.createElement("div");
  editIcon.classList.add("edit-icon");
  editIcon.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

  const cancelIcon = document.createElement("div");
  cancelIcon.classList.add("delete-icon");
  cancelIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';

  div.append(doneIcon, editIcon, cancelIcon);
};

const handleIcons = (e) => {
  if (e.target.classList.contains("fa-check")) {
    e.target
      .closest("li")
      .querySelector(".content")
      .classList.toggle("done-task");
  } else if (e.target.classList.contains("fa-pen-to-square")) {
    editTask(e);
  } else if (e.target.classList.contains("fa-trash")) {
    const taskToDelete = e.target.closest("li");
    taskToDelete.remove(ulList);
    if (allLi.length === 0) {
      emptyList.classList.remove("hidden");
    }
    saveToLS();
  }
};

const editTask = (e) => {
  const oldTodo = e.target.closest("li").id;
  editedTodo = document.getElementById(oldTodo);
  editInput.value = editedTodo.firstChild.textContent;
  editPanel.classList.remove("hidden");
};

const closeEditPanel = () => {
  editPanel.classList.add("hidden");
  editInput.value = "";
};

const changeTodoContent = () => {
  if (editInput.value !== "") {
    editError.classList.add("hidden");
    editedTodo.firstChild.textContent = editInput.value;
    editPanel.classList.add("hidden");
    saveToLS();
  } else {
    editError.classList.remove("hidden");
  }
};

document.addEventListener("DOMContentLoaded", loadTasksFromLS);
addBtn.addEventListener("click", addTask);
ulList.addEventListener("click", handleIcons);
saveEditBtn.addEventListener("click", changeTodoContent);
cancelEditBtn.addEventListener("click", closeEditPanel);

// How to save tasks to localStorage
