let todoList = [];
let projectList = [{Title:'Home'}];

function addToDo(title, description, duedate, priority) {
  todoList.push(newTask(title, description, duedate, priority));
}

function addProject(title, priority, task) {
  projectList.push(title, priority, task);
}

function projectData(project) {
  let Project;
  localStorage.setItem("project", JSON.stringify(project));
  Project = JSON.parse(localStorage.getItem("project"));
  return Project;
}

function todoData(todo) {
  let Todo;
  localStorage.setItem("todo", JSON.stringify(todo));
  Todo = JSON.parse(localStorage.getItem("todo"));
  return Todo;
}

const newTask = (title, description, dueDate, priority,destination) => {
  const task = {
    Id: crypto.randomUUID(),
    Title: title,
    Description: description,
    Deadline: dueDate,
    Priority: priority,
    Status: false,
    Destination: destination,
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

const newProject = (title, priority, task) => {
  return {
    ID: crypto.randomUUID(),
    Title: title,
    Priority: priority,
    task: task,
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
};
