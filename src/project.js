export default class Project {
  constructor(name) {
    this.name = name;
    this.todo = [];
  }

  addTodo(newTodo) {
    this.todo.push(newTodo);
  }

  deleteTodo(title) {
    for (let elem of this.todo) {
      if ((elem.title = title)) {
        this.todo.splice(this.todo.indexOf(elem), 1);
      }
    }
  }
}
