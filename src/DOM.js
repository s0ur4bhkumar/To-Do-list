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
  const btnContainer = document.createElement("div");
  const doneBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  delBtn.textContent = "Delete";
  doneBtn.classList.add("doneBtn");
  delBtn.classList.add("delBtn");
  btnContainer.append(doneBtn, delBtn);
  del(delBtn)
  div.append(p);
  if (dialog.returnValue !== "cancel") {
    if (dialog.className === "todo-dialog") {
      div.classList.add("task");
      div.append(btnContainer);
      p.textContent = dialog.returnValue;
      tasks.append(div);
      return div;
    } else if (dialog.className === "project-Dialog") {
      div.classList.add("project");
      div.append(btnContainer);
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
  // console.log(objlist);
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
      Card.classList.add(
        `taskCard`,
        `${obj.Title.trim().replace(/\s+/g, "-").toLowerCase()}`,
      );
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

function Home() {
  const container = document.querySelector(".content");
  container.innerHTML = "";
  const lst = JSON.parse(localStorage.getItem("project"));
  // console.log(lst);
  if (lst.length !== 0) {
    lst.forEach((task) => {
      if (task.Title === "Home") {
        Object.values(task).forEach((val) => {
          if (val !== "Home") {
            const card = document.createElement("div");
            const btnContainer = document.createElement("div");
            const doneBtn = document.createElement("button");
            const delBtn = document.createElement("button");
            doneBtn.textContent = "Done";
            delBtn.textContent = "Delete";
            doneBtn.classList.add("doneBtn");
            delBtn.classList.add("delBtn");
            btnContainer.append(doneBtn, delBtn);
            card.classList.add("homeCard");
            del(delBtn)
            for (const [key, value] of Object.entries(val)) {
              if (key !== "Id" && key !== "createdBy") {
                const p = document.createElement("p");
                p.textContent = `${key}: ${value}`;
                card.append(p, btnContainer);
              }
            }
            container.append(card);
          }
        });
      }
    });
  }
}

function projectDisplay(objlist, title) {
  const container = document.querySelector(".content");
  container.innerHTML = "";
  objlist.forEach((obj) => {
    if (obj.Title !== "Home") {
      // container.textContent = obj['Task'];
      obj["Task"].forEach((ele) => {
        if (ele.Project === title) {
          console.log("the obj: ", ele);
          console.log(ele.Project, title);
          const card = document.createElement("div");
          const btnContainer = document.createElement("div");
          const doneBtn = document.createElement("button");
          const delBtn = document.createElement("button");
          doneBtn.textContent = "Done";
          delBtn.textContent = "Delete";
          doneBtn.classList.add("doneBtn");
          delBtn.classList.add("delBtn");
          btnContainer.append(doneBtn, delBtn);
          card.classList.add("homeCard");
          del(delBtn)
          for (const [key, value] of Object.entries(ele)) {
            console.log(key, value);
            const p = document.createElement("p");
            p.textContent = `${key}: ${value}`;
            card.append(p);
          }
          card.append(btnContainer);
          container.append(card);
        }
      });
    }
  });
}

function addHome() {
  const projectContainer = document.querySelector(".Project-list");
  const projectHome = document.createElement("div");
  projectHome.textContent = "Home";
  projectHome.classList.add("Home");
  projectContainer.append(projectHome);
  projectHome.addEventListener("click", () => {
    Home();
  });
}

function addToContent(e) {
  container.innerHTML = "";
  // console.log('add: ', e.target.className)
  let Title;
  let List;
  if (e.target.classList.contains("project")) {
    List = JSON.parse(localStorage.getItem("project"));
    Title = e.target.querySelector("p").textContent;
    const className = Title.trim().replace(/\s+/g, "-").toLowerCase();
    projectDisplay(List, Title);
    e.target.classList.add(`${className}`);
  } else {
    List = JSON.parse(localStorage.getItem("todo"));
    const Title = e.target.querySelector("p").textContent;
    const className = Title.trim().replace(/\s+/g, "-").toLowerCase();
    e.target.classList.add(`${className}`);
    template(List, Title);
  }
  console.log(List);
  // container.textContent = `hello: brother`;
}

function del(button) {
  button.addEventListener('click', (e) => {
    const ele = e.target.closest('div').parentNode
    ele.remove()
  })
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
  if (e.target.classList.contains("task")) {
    addToContent(e);
  }
});

projectContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("project")) {
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

addHome();
Home();
// addHome();
