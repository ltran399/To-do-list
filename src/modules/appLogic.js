// src/modules/appLogic.js
import Project from './project';
import Todo from './todo';

const AppLogic = (() => {
  let projects = [];
  let currentProject = null;

  const loadProjects = () => {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    if (storedProjects) {
      projects = storedProjects.map((proj) => {
        const project = new Project(proj.name);
        project.todos = proj.todos.map((todo) => {
          const dueDate = new Date(todo.dueDate);
          const newTodo = new Todo(
            todo.title,
            todo.description,
            dueDate,
            todo.priority
          );
          newTodo.completed = todo.completed;
          return newTodo;
        });
        return project;
      });
      currentProject = projects[0];
    } else {
      const defaultProject = new Project('Default');
      projects.push(defaultProject);
      currentProject = defaultProject;
    }
  };

  const saveProjects = () => {
    localStorage.setItem('projects', JSON.stringify(projects));
  };

  const addProject = (projectName) => {
    const newProject = new Project(projectName);
    projects.push(newProject);
    currentProject = newProject;
    saveProjects();
  };

  const setCurrentProject = (projectName) => {
    currentProject = projects.find((proj) => proj.name === projectName);
  };

  const getCurrentProject = () => currentProject;

  const getProjects = () => projects;

  const addTodoToCurrentProject = (todo) => {
    currentProject.addTodo(todo);
    saveProjects();
  };

  const deleteTodoFromCurrentProject = (todoTitle) => {
    currentProject.deleteTodo(todoTitle);
    saveProjects();
  };

  return {
    loadProjects,
    addProject,
    setCurrentProject,
    getCurrentProject,
    getProjects,
    addTodoToCurrentProject,
    deleteTodoFromCurrentProject,
  };
})();

export default AppLogic;
