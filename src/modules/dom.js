// src/modules/dom.js
import AppLogic from './appLogic';
import Todo from './todo';

const DOM = (() => {
  const projectListElement = document.getElementById('project-list');
  const todoListElement = document.getElementById('todo-list');
  const projectTitleElement = document.getElementById('project-title');

  const renderProjects = () => {
    projectListElement.innerHTML = '';
    const projects = AppLogic.getProjects();

    projects.forEach((project) => {
      const li = document.createElement('li');
      li.textContent = project.name;
      li.addEventListener('click', () => {
        AppLogic.setCurrentProject(project.name);
        renderTodos();
        highlightCurrentProject();
      });
      projectListElement.appendChild(li);
    });
    highlightCurrentProject();
  };

  const highlightCurrentProject = () => {
    const projects = AppLogic.getProjects();
    const currentProject = AppLogic.getCurrentProject();
    Array.from(projectListElement.children).forEach((li, index) => {
      if (projects[index] === currentProject) {
        li.classList.add('active-project');
      } else {
        li.classList.remove('active-project');
      }
    });
    projectTitleElement.textContent = currentProject.name;
  };

  const renderTodos = () => {
    todoListElement.innerHTML = '';
    const currentProject = AppLogic.getCurrentProject();
    currentProject.todos.forEach((todo) => {
      const li = document.createElement('li');
      li.className = 'todo-item';

      const title = document.createElement('span');
      title.textContent = todo.title;

      const dueDate = document.createElement('span');
      dueDate.textContent = todo.getFormattedDueDate();

      const priority = document.createElement('span');
      priority.textContent = todo.priority;
      priority.className = `priority-${todo.priority.toLowerCase()}`;

      const expandBtn = document.createElement('button');
      expandBtn.textContent = 'View';
      expandBtn.addEventListener('click', () => {
        showTodoDetails(todo);
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        AppLogic.deleteTodoFromCurrentProject(todo.title);
        renderTodos();
      });

      li.append(title, dueDate, priority, expandBtn, deleteBtn);
      todoListElement.appendChild(li);
    });
  };

  const showTodoDetails = (todo) => {
    // Implement a modal or expand section to show/edit todo details
    alert(`Title: ${todo.title}\nDescription: ${todo.description}`);
  };

  const bindAddProject = () => {
    const addProjectBtn = document.getElementById('add-project-btn');
    const projectNameInput = document.getElementById('project-name-input');

    addProjectBtn.addEventListener('click', () => {
      const projectName = projectNameInput.value.trim();
      if (projectName === '') return;
      AppLogic.addProject(projectName);
      renderProjects();
      renderTodos();
      projectNameInput.value = '';
    });
  };

  const bindAddTodo = () => {
    const addTodoBtn = document.getElementById('add-todo-btn');
    const todoTitleInput = document.getElementById('todo-title-input');
    const todoDescriptionInput = document.getElementById('todo-description-input');
    const todoDueDateInput = document.getElementById('todo-duedate-input');
    const todoPriorityInput = document.getElementById('todo-priority-input');

    addTodoBtn.addEventListener('click', () => {
      const title = todoTitleInput.value.trim();
      const description = todoDescriptionInput.value.trim();
      const dueDate = new Date(todoDueDateInput.value);
      const priority = todoPriorityInput.value;

      if (title === '' || isNaN(dueDate)) return;

      const newTodo = new Todo(title, description, dueDate, priority);
      AppLogic.addTodoToCurrentProject(newTodo);
      renderTodos();

      todoTitleInput.value = '';
      todoDescriptionInput.value = '';
      todoDueDateInput.value = '';
      todoPriorityInput.value = 'Low';
    });
  };

  const init = () => {
    AppLogic.loadProjects();
    renderProjects();
    renderTodos();
    bindAddProject();
    bindAddTodo();
  };

  return { init };
})();

export default DOM;
