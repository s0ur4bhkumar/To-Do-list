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
    const Name = form.querySelector("#Title");
    formDataHandle(dialog);
    dialog.returnValue = Name.value;
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
  }
}

function addToContainer(dialog) {
  const div = document.createElement("div");
  const p = document.createElement("p");
  const delBtn = document.createElement("button");
  delBtn.textContent = "-";
  div.append(p);
  if (dialog.returnValue !== "cancel") {
    if (dialog.className === "todo-dialog") {
      div.classList.add("task");
      div.append(delBtn);
      p.textContent = dialog.returnValue;
      tasks.append(div);
      return div;
    } else if (dialog.className === "project-Dialog") {
      div.classList.add("project");
      div.append(delBtn);
      p.textContent = dialog.returnValue;
      projectContainer.append(div);
    }
  }
}

function newProjectOption(title, value) {
  const selection = document.getElementById("project-list");
  const option = new Option(title, value);
  selection.add(option);
}

function template(objlist, title) {
  const Card = document.createElement("div");
  const btnContainer = document.createElement("div");
  const doneBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  btnContainer.classList.add("cardBtnContainer");
  btnContainer.append(doneBtn, delBtn);
  doneBtn.textContent = "Done";
  delBtn.textContent = "Delete";
  objlist.forEach((obj) => {
    if (obj.Title === title) {
      Card.classList.add(`taskCard`, `${obj.Title}`);
      for (const [key, value] of Object.entries(obj)) {
        if ((key !== "Id" && key !== "createdBy") || key !== "task") {
          const detail = document.createElement("p");
          detail.textContent = `${key}: ${value}`;
          Card.append(detail);
        }
      }
      Card.append(btnContainer);
      container.append(Card);
    }
  });
}

function addToContent(e) {
  container.innerHTML = "";
  // console.log('add: ', e.target.className)
  let todoList;
  if (e.target.className === "project") {
    console.log("yup");
    todoList = JSON.parse(localStorage.getItem("project"));
  } else {
    todoList = JSON.parse(localStorage.getItem("todo"));
  }
  console.log(todoList);
  const Title = e.target.querySelector("p").textContent;
  template(todoList, Title);
  // container.textContent = `hello: brother`;
  e.target.classList.add(`${Title}`);
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

tasks.addEventListener("click", (e) => {
  if (e.target.className === "task") {
    console.log(e.target);
    addToContent(e);
  }
});

projectContainer.addEventListener("click", (e) => {
  if (e.target.className === "project") {
    addToContent(e);
  }
});

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    formBtnHandler(e);
  });
});

myDialog.forEach((dialog) =>
  dialog.addEventListener("close", (e) => {
    addToContainer(dialog);
  }),
);
