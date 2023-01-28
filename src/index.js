import Project from './project';
import Todo from './Todo';
import { replaceAddProj } from './sideBarUI';
import projectIcon from './imgs/newProjIcon.svg';

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
      if (inputDiv[0].value !== '') {
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
  if (e.target.getAttribute('class') === 'new-project') {
    console.log('it worked');
  }
});
