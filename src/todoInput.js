// this module will create the form to add todo
export default function createTodoForm() {
  let div = document.createElement('div');
  div.classList.add('todo-input');

  let taskNameDiv = document.createElement('div');
  let taskName = document.createElement('div');
  taskName.textContent = 'Task Name';
  let taskNameInput = document.createElement('input');
  taskNameInput.setAttribute('type', 'text');
  taskNameDiv.append(taskName, taskNameInput);

  let dueDateDiv = document.createElement('div');
  let dueDate = document.createElement('div');
  dueDate.textContent = 'Due Date';
  let dueDateInput = document.createElement('input');
  dueDateInput.setAttribute('type', 'date');
  dueDateDiv.append(dueDate, dueDateInput);

  let priorityDiv = document.createElement('div');
  let priority = document.createElement('div');
  priority.textContent = 'Priority';
  let priorityInput = document.createElement('select');
  let low = document.createElement('option');
  low.textContent = 'Low';
  let medium = document.createElement('option');
  medium.textContent = 'Medium';
  let high = document.createElement('option');
  high.textContent = 'High';
  priorityInput.append(low, medium, high);
  priorityDiv.append(priority, priorityInput);

  let discriptionDiv = document.createElement('div');
  let discription = document.createElement('div');
  discription.textContent = 'Discription';
  let discriptionInput = document.createElement('input');
  discriptionInput.setAttribute('type', 'textArea');
  discriptionDiv.append(discription, discriptionInput);

  let buttonsDiv = document.createElement('div');
  let add = document.createElement('button');
  add.classList.add('addTodoBtn');
  add.textContent = 'Add';
  let cancel = document.createElement('button');
  cancel.classList.add('cancelTodoBtn');
  cancel.textContent = 'Cancel';
  buttonsDiv.append(add, cancel);

  div.append(taskNameDiv, dueDateDiv, priorityDiv, discriptionDiv, buttonsDiv);
  return div;
}
