import Project from './project';
import Todo from './Todo';
import { replaceAddProj } from './sideBarUI';
import projectIcon from './imgs/newProjIcon.svg';
// the array that will store all projects
const projectsLibrary = [];

let projects = document.querySelector('#projects');

const sideUI = (function () {
  document.querySelector('#newProj').addEventListener('click', () => {
    let newForm = replaceAddProj();
    let inputDiv = newForm[1].children;

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

    inputDiv[2].addEventListener('click', () => {
      projects.append(newForm[0]);
      newForm[1].remove();
    });
  });
})();
