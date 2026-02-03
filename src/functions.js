let todoList = [];
let projectList = [];

function addToDo(title, description, duedate, priority) {
  todoList.push(newTask(title, description, duedate, priority));
}

function addProject(title, priority, task) {
  projectList.push(title, priority, task);
}

function Data(project, todo) {
  localStorage.setItem("project", JSON.stringify(project));
  localStorage.setItem("todo", JSON.stringify(todo));
  let Project = JSON.parse(localStorage.getItem("project"));
  let Todo = JSON.parse(localStorage.getItem("todo"));
  return {Project, Todo };
}

const newTask = (title, description, dueDate, priority) => {
  const task = {
    Id: crypto.randomUUID(),
    Title: title,
    Description: description,
    Deadline: dueDate,
    Priority: priority,
    Status: false,
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
  };
};

export {
  todoList,
  projectList,
  addProject,
  addToDo,
  Data,
  newTask,
  newProject,
};
