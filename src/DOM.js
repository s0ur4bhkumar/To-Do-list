import {
  todoList,
  projectList,
  projectData,
  todoData,
  addTaskToHome,
  addTaskToProject,
} from "./functions.js";

// ***********************************************DOM helper functions****************************************

function formBtnHandler(e) {
  if (e.target.className === "todoBtn" || e.target.className === "projectBtn") {
    e.target.closest("div").nextElementSibling.showModal();
  } else if (e.target.className === "confirm") {
    e.preventDefault();
    const dialog = e.target.closest("dialog");
    const form = dialog.querySelector("form");
    formDataHandle(dialog);
    dialog.close();
    form.reset();
  }
}

function formDataHandle(dialog) {
  let data = {};
  if (dialog.className === "todo-dialog") {
    const Title = dialog.querySelector("#Title");
    const Description = dialog.querySelector("#Description");
    const Date = dialog.querySelector("#Due-Date");
    const projectList = dialog.querySelector("#project-list");
    const Priority = dialog.querySelectorAll(`input[type = 'radio']`);
    data = {
      Title: Title.value,
      Description: Description.value,
      Date: Date.value,
      Project: projectList.value,
    };
    Priority.forEach((field) => {
      if (field.checked) {
        data["Priority"] = field.value;
      }
    });
    todoData(data);
    if (projectList.value !== "Home") {
      addTaskToProject(data, projectList.value);
    }
    // console.log(data)

    // console.log(data);
    // console.log(data)
    // localStorage.setItem(`${data.Title}`, JSON.stringify(data));
    dialog.close();
    addTaskToHome();
  } else if (dialog.className === "project-Dialog") {
    const Title = dialog.querySelector("form #Title");
    const Priority = dialog.querySelectorAll(`input[type = 'radio']`);
    data = { Title: Title.value };
    Priority.forEach((field) => {
      if (field.checked) {
        data["Priority"] = field.value;
      }
    });
    newProjectOption(Title.value, Title.value);
    projectData(data);
    // console.log(data);
  }
}

function addToContainer(dialog) {
  const div = document.createElement("div");
  if (dialog.className === "todo-dialog") {
    div.textContent = "this is task";
    tasks.append(div);
  } else if (dialog.className === "project-Dialog") {
    div.textContent = "this is project";
    projectContainer.append(div);
  }
}

function newProjectOption(title, value) {
  const selection = document.getElementById("project-list");
  const option = new Option(title, value);
  selection.add(option);
}

// *********************************************DOM manipulation*********************************************

const container = document.querySelector(".content");
const myDialog = document.querySelectorAll("dialog");
const projectDialog = document.querySelector(".project-form");
const tasks = document.querySelector(".Todo-list");
const projectContainer = document.querySelector(".Project-list");
const buttons = document.querySelectorAll("button");
const projects = projectList;
const taskList = todoList;
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    formBtnHandler(e);
    // console.log(todoList);
    // console.log(projectList)
    // const dialog = e.target.closest('dialog')
    // console.log(dialog)
    // console.log(dialog.returnValue)
  });
});

myDialog.forEach((dialog) =>
  dialog.addEventListener("close", (e) => {
    addToContainer(dialog);
    console.log("projects: ", projects);
    console.log("tasks: ", taskList);
  }),
);

// console.log(projects)
// console.log(todoList)
// const task = newTask('testing', 'just testing', 'none', 'none', 'none')
// // console.log(localStorage)
// const Task = todoData(task)
// console.log(Task)
