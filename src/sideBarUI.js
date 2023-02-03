/*  this module will include 3 functions
1- createNewProj will create the div that take input for new project
 and return it
2- replaceAddProj will replace the addProj with the new form
 and returns the addProj and the div
*/
export function createNewProjForm() {
  let div = document.createElement('div');
  div.classList.add('tempForm');
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  let button1 = document.createElement('button');
  button1.textContent = 'Add';
  let button2 = document.createElement('button');
  button2.textContent = 'Cancel';
  div.append(input, button1, button2);
  return div;
}

export function replaceAddProj() {
  let addProj = document.querySelector('#newProj');
  let projects = document.querySelector('#projects');
  addProj.remove();
  let newForm = createNewProjForm();
  projects.append(newForm);
  return [addProj, newForm];
}
