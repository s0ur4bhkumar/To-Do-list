let todoList = [];
let projectList = [{ Title: "Home" }];

function addToDo(data) {
  const task = newTask(
    data.Title,
    data.Description,
    data.Date,
    data.Priority,
    data.Project,
  );
  todoList.push(task);
}

function addProject(data) {
  projectList.push(newProject(data.Title, data.Priority));
}

function addTaskToHome() {
  if (todoList.length !== 0) {
    todoList.forEach((task) => {
      projectList[0][task.Title] = task;
    });
    localStorage.setItem("project", JSON.stringify(projectList));
  }
}

function projectData(data) {
  const project = newProject(data.Title, data.Priority);
  addProject(project);
  localStorage.setItem("project", JSON.stringify(projectList));
}

function todoData(todo) {
  addToDo(todo);
  localStorage.setItem(`todo`, JSON.stringify(todoList));
}

function addTaskToProject(task, projectName) {
  projectList.forEach((project) => {
    if (project.Title === projectName) {
      project.Task.push(task);
    }
  });
}

const newTask = (title, description, Date, priority, project) => {
  const task = {
    Title: title,
    Id: crypto.randomUUID(),
    Description: description,
    Deadline: Date,
    Priority: priority,
    Status: false,
    Project: project,
    createdBy: "newTask",
    toggleStatus: () => {
      if (task.Status === true) {
        task.Status = false;
      } else {
        task.Status = true;
      }
    },
  };
  return task;
};

const newProject = (title, priority) => {
  return {
    Id: crypto.randomUUID(),
    Title: title,
    Priority: priority,
    Task: [],
    createdBy: "newProject",
  };
};

function checkTitles(name) {
  const combineList = [...todoList, ...projectList];
  const titles = combineList.map((obj) => obj.Title);
  if (titles.includes(name)) {
    alert("please use a different title");
    return true;
  }
}

function delFromlocalStorageAndMainArray(main, ele) {
  if (main === "project") {
    projectList.forEach((project) => {
      if (project.Title === ele) {
        projectList = projectList.filter((project) => project.Title != ele);
        localStorage.setItem("project", JSON.stringify(projectList));
      }
    });
  } else if ((main = "task")) {
    todoList.forEach((task) => {
      if (task.Title === ele) {
        todoList = todoList.filter((task) => task.Title != ele);
        localStorage.setItem("todo", JSON.stringify(todoList));
      }
    });
    projectList.forEach((project) => {
      if (project.Title === "Home") {
        Object.keys(project).forEach((prop) => {
          if (`${prop}` === ele) {
            delete project[prop];
          }
          localStorage.setItem("project", JSON.stringify(projectList));
        });
      } else {
        project.Task.forEach((obj) => {
          if (obj.Title === ele) {
            project.Task.splice(project.Task.indexOf(obj), 1);
            localStorage.setItem("project", JSON.stringify(projectList));
          }
        });
      }
    });
  }
}

export {
  todoList,
  projectList,
  addProject,
  addToDo,
  projectData,
  todoData,
  newTask,
  newProject,
  addTaskToHome,
  addTaskToProject,
  checkTitles,
  delFromlocalStorageAndMainArray,
};
