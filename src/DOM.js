import { todoList, projectList, addProject, addToDo, Data, newTask, newProject } from "./functions.js"

const monday = newTask("hell", "hella", "who knows", "least");

const project = newProject("Home", "high", monday);

const data = Data(project, monday)

console.log(data)