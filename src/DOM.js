import {
  todoList,
  projectList,
  addProject,
  addToDo,
  projectData,
  todoData,
  newTask,
  newProject,
} from "./functions.js";

const monday = newTask("hell", "hella", "who knows", "least");

const project = newProject("Home", "high", monday);

// console.log(project.createdBy === 'newProject')
// console.log(monday.createdBy)

const data = projectData(project);
const todo = todoData(monday);
console.log(data);
console.log(todo);
