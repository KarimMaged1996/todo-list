import Project from './project';
import Todo from './Todo';
import { replaceAddProj } from './sideBarUI';
import projectIcon from './imgs/newProjIcon.svg';
import fetchArr from './fetchLibraryArray';
import createProjectUI from './projectsUI';

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
