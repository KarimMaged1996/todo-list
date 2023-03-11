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
        if (elem.isComplete === true) {
          div.classList.add('green');
        }
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.classList.add('todoDelete');
        let title = document.createElement('div');
        let name = document.createElement('div');
        name.textContent = 'Title:';
        let realName = document.createElement('div');
        realName.textContent = elem.title;
        title.append(name, realName);
        title.classList.add('todoTitle'); //class for title
        let date = document.createElement('div');
        let dateName = document.createElement('div');
        dateName.textContent = 'Due Date:';
        let realDate = document.createElement('div');
        realDate.textContent = elem.dueDate;
        date.append(dateName, realDate);
        date.classList.add('todoDate'); // class for date
        let priority = document.createElement('div');
        let priorityName = document.createElement('div');
        priorityName.textContent = 'Priority:';
        let realPriority = document.createElement('div');
        realPriority.textContent = elem.priority;
        priority.append(priorityName, realPriority);
        priority.classList.add('todoPriority');
        let completed = document.createElement('button');
        completed.textContent = 'completed';
        completed.classList.add('todoCompleted');
        if (elem.discription !== '') {
          let discription = document.createElement('div');
          let discriptionName = document.createElement('div');
          discriptionName.textContent = 'Discription:';
          let realDiscription = document.createElement('div');
          realDiscription.textContent = elem.discription;
          discription.append(discriptionName, realDiscription);
          discription.classList.add('todoDiscription');
          div.append(deleteBtn, title, date, priority, discription, completed);
        } else {
          div.append(deleteBtn, title, date, priority, completed);
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
