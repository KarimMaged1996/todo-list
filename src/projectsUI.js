import plusIcon from './imgs/plus.svg';

// function that will take a project object and create its content
export default function createProjectUI(project) {
  let header = document.createElement('h1');
  header.textContent = project.name;

  //this function will create the contents of a todo if the project has todos
  function todosUI() {
    let todos = [];
    if (project.todo.length > 0) {
      project.todo.forEach((elem) => {
        let div = document.createElement('div');
        div.classList.add('single-todo');
        let title = document.createElement('div');
        title.textContent = elem.title;
        let date = document.createElement('div');
        date.textContent = elem.dueDate;
        let priority = document.createElement('div');
        priority.textContent = elem.priority;
        if (elem.discription !== '') {
          let discription = document.createElement('div');
          discription.textContent = elem.discription;
          div.append(title, date, priority, discription);
        } else {
          div.append(title, date, priority);
        }
        todos.push(div);
      });
    }
    return todos;
  }

  let newTodo = document.createElement('div');
  newTodo.classList.add('addNewTodo');
  let icon = new Image();
  icon.src = plusIcon;
  let divText = document.createElement('div');
  divText.textContent = 'Add a todo';
  newTodo.append(icon, divText);

  return [header, ...todosUI(), newTodo];
}
