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
    console.log("task to home executed");
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
    console.log(projectName, project.Title);
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
    Destination: project,
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
    ID: crypto.randomUUID(),
    Title: title,
    Priority: priority,
    Task: [],
    createdBy: "newProject",
  };
};

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
};
