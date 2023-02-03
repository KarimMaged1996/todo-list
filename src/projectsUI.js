import plusIcon from './imgs/plus.svg';

// function that will take a project object and create its content
export default function createProjectUI(project) {
  let header = document.createElement('h1');
  header.textContent = project.name;

  //will need more functionality to add todos here.....

  let newTodo = document.createElement('div');
  newTodo.classList.add('addNewTodo');
  let icon = new Image();
  icon.src = plusIcon;
  let divText = document.createElement('div');
  divText.textContent = 'Add a todo';
  newTodo.append(icon, divText);

  return [header, newTodo];
}
