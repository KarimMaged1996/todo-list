import Project from './project';
import Todo from './Todo';
import { replaceAddProj } from './sideBarUI';
import projectIcon from './imgs/newProjIcon.svg';
import fetchArr from './fetchLibraryArray';
import createProjectUI from './projectsUI';
import createTodoForm from './todoInput';

// the array that will store all projects
const projectsLibrary = [];

let projects = document.querySelector('#projects');

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
        newProj.append(icon, divText);
        projects.append(newProj, newForm[0]);
        newForm[1].remove();
        projectsLibrary.push(new Project(inputDiv[0].value));
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
    e.target.parentNode.getAttribute('class') === 'new-project'
  ) {
    let projectName;
    // if target was the parent container its children length > 0
    if (e.target.children.length > 0) {
      projectName = e.target.children[1].textContent;
    } else {
      // the case if the child was clicked
      projectName = e.target.parentNode.children[1].textContent;
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
      e.target.parentNode.getAttribute('class') === 'addNewTodo'
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
      if (title.value === '') {
        title.style.border = 'solid 0.25vh red';
        title.setAttribute('placeholder', 'this input is required');
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
