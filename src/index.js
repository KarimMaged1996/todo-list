import Project from './project';
import Todo from './Todo';
import { replaceAddProj } from './sideBarUI';
import projectIcon from './imgs/newProjIcon.svg';
import fetchArr from './fetchLibraryArray';
import createProjectUI from './projectsUI';
import createTodoForm from './todoInput';
import populateLocalStorage from './storage';

// the array that will store all projects
const projectsLibrary = [];
let projects = document.querySelector('#projects');

// this module is responsible to populate the projectsLibrary array
// session is not empty
const storageModule = (function () {
  if (sessionStorage.length > 1) {
    let storageArr = JSON.parse(sessionStorage.getItem('testStorage'));
    for (let elem of storageArr) {
      projectsLibrary.push(new Project(elem.name));
    }

    for (let i = 0; i < projectsLibrary.length; i++) {
      for (let j = 0; j < storageArr[i].todo.length; j++) {
        projectsLibrary[i].addTodo(
          new Todo(
            storageArr[i].todo[j].title,
            storageArr[i].todo[j].dueDate,
            storageArr[i].todo[j].priority,
            storageArr[i].todo[j].discription,
            storageArr[i].todo[j].isComplete
          )
        );
      }
    }
    // this will append proj names to the UI
    let div = document.querySelector('#newProj');
    div.remove();
    projectsLibrary.forEach((proj) => {
      let newProj = document.createElement('div');
      newProj.classList.add('new-project');
      let icon = new Image();
      icon.src = projectIcon;
      let divText = document.createElement('div');
      divText.textContent = proj.name;
      let delProj = document.createElement('div');
      delProj.textContent = 'X';
      delProj.classList.add('delProj');
      newProj.append(icon, divText, delProj);
      projects.append(newProj);
    });
    projects.append(div);
  }
})();

/*  the sideUI Module is responsible for the input that will appear on the 
sideBar, it will create a new project and append it to the projects div
 */
const sideUI = (function () {
  //event listener for the add new project button
  document.querySelector('#newProj').addEventListener('click', () => {
    let newForm = replaceAddProj();
    let inputDiv = newForm[1].children;

    /* event listener for the add button 
       it will create a new div for the project that has an icon
       and the project name. it will create a new Project and push it 
       to the projectsLibrary array. it also checks the project name is
       not empty
    */
    inputDiv[1].addEventListener('click', () => {
      if (
        inputDiv[0].value !== '' &&
        fetchArr(projectsLibrary, inputDiv[0].value) === undefined
      ) {
        let newProj = document.createElement('div');
        newProj.classList.add('new-project');
        let icon = new Image();
        icon.src = projectIcon;
        let divText = document.createElement('div');
        divText.textContent = inputDiv[0].value;
        let delProj = document.createElement('div');
        delProj.textContent = 'X';
        delProj.classList.add('delProj');
        newProj.append(icon, divText, delProj);
        projects.append(newProj, newForm[0]);
        newForm[1].remove();
        projectsLibrary.push(new Project(inputDiv[0].value));
        populateLocalStorage(projectsLibrary);
      } else if (fetchArr(projectsLibrary, inputDiv[0].value) !== undefined) {
        inputDiv[0].style.border = 'solid 0.25vh red';
        inputDiv[0].value = '';
        inputDiv[0].setAttribute('placeholder', 'Duplicate project name');
      } else {
        inputDiv[0].style.border = 'solid 0.25vh red';
        inputDiv[0].setAttribute('placeholder', 'project must have a name');
      }
    });
    /* event listener for the cancel button that will remove the input div and 
       recreate the add new project button
    */
    inputDiv[2].addEventListener('click', () => {
      projects.append(newForm[0]);
      newForm[1].remove();
    });
  });
})();

//event listener for dynamically added projects
document.addEventListener('click', (e) => {
  // event delegation check if target or target parent has the class new-project
  if (
    e.target.getAttribute('class') === 'new-project' ||
    (e.target.parentElement.getAttribute('class') === 'new-project' &&
      e.target.getAttribute('class') !== 'delProj')
  ) {
    let projectName;
    // if target was the parent container its children length > 0
    if (e.target.children.length > 0) {
      projectName = e.target.children[1].textContent;
    } else {
      // the case if the child was clicked
      projectName = e.target.parentElement.children[1].textContent;
    }

    let project = fetchArr(projectsLibrary, projectName);
    let parent = document.querySelector('.todos');
    let Oldchildren = Array.from(parent.children);
    let newChildren = createProjectUI(project);
    Oldchildren.forEach((elem) => {
      elem.remove();
    });
    parent.append(...newChildren);
  }
});

// event listener to delete a project
document.addEventListener('click', (e) => {
  if (e.target.getAttribute('class') === 'delProj') {
    let delProjName = e.target.parentElement.children[1].textContent;
    e.target.parentElement.remove();
    for (let proj in projectsLibrary) {
      if (projectsLibrary[proj].name === delProjName) {
        projectsLibrary.splice(proj, 1);
      }
    }
    populateLocalStorage(projectsLibrary);
    let parent = document.querySelector('.todos');
    while (parent.children.length > 0) {
      parent.removeChild(parent.children[0]);
    }
  }
});

// module responsible for the add todo
const todos = (function () {
  let todoForm = createTodoForm();
  let title = todoForm.children[0].children[1];
  let dueDate = todoForm.children[1].children[1];
  let priority = todoForm.children[2].children[1];
  let discription = todoForm.children[3].children[1];

  //event listiner to pop up a form when the add todo button is clicked
  document.addEventListener('click', (e) => {
    if (
      e.target.getAttribute('class') === 'addNewTodo' ||
      e.target.parentElement.getAttribute('class') === 'addNewTodo'
    ) {
      document.body.append(todoForm);
      let todoBtn = document.querySelector('.addNewTodo');
      todoBtn.style.visibility = 'hidden';
    }
  });
  //event listener for the cancel button
  document.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'cancelTodoBtn') {
      todoForm.remove();
      let todoBtn = document.querySelector('.addNewTodo');
      todoBtn.style.visibility = 'visible';
    }
  });

  //event listener for the add button
  document.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'addTodoBtn') {
      let projectParent = document.querySelector('.todos');
      let projectName = projectParent.children[0].textContent;
      let currentProj = fetchArr(projectsLibrary, projectName);
      let names = currentProj.todoNames(); // names of existing todos

      // check if the title is empty
      if (title.value === '') {
        title.style.border = 'solid 0.25vh red';
        title.setAttribute('placeholder', 'this input is required');

        // check if the title is duplicated
      } else if (names.includes(title.value)) {
        title.style.border = 'solid 0.25vh red';
        title.value = '';
        title.setAttribute('placeholder', 'Duplicate Name');

        // check if date is empty
      } else if (dueDate.value === '') {
        dueDate.style.border = 'solid 0.25vh red';
      } else {
        let projectParent = document.querySelector('.todos');
        let projectName = projectParent.children[0].textContent;
        let currentProj = fetchArr(projectsLibrary, projectName);
        currentProj.addTodo(
          new Todo(
            title.value,
            dueDate.value,
            priority.value,
            discription.value
          )
        );
        populateLocalStorage(projectsLibrary);
        let Oldchildren = Array.from(projectParent.children);
        Oldchildren.forEach((child) => {
          child.remove();
        });
        let newChildren = createProjectUI(currentProj);
        projectParent.append(...newChildren);
        todoForm.remove();
      }
    }
  });
})();

const todoFunctionality = (function () {
  //event for complete buton
  document.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'todoCompleted') {
      e.target.parentElement.classList.add('green');
      let todoTitle =
        e.target.parentElement.children[1].children[1].textContent;
      let projectTitle =
        e.target.parentElement.parentElement.children[0].textContent;
      let project = fetchArr(projectsLibrary, projectTitle);
      project.completeTodo(todoTitle);
      populateLocalStorage(projectsLibrary);
    }
  });

  //event for delete button
  document.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'todoDelete') {
      let todoTitle =
        e.target.parentElement.children[1].children[1].textContent;
      let projectTitle =
        e.target.parentElement.parentElement.children[0].textContent;
      let project = fetchArr(projectsLibrary, projectTitle);
      project.deleteTodo(todoTitle);
      populateLocalStorage(projectsLibrary);
      e.target.parentElement.remove();
    }
  });
})();
