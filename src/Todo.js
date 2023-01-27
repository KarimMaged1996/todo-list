export default class Todo {
  constructor(title, dueDate, priority, discription = '', isComplete = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.priority = priority;
    this.discription = discription;
    this.isComplete = isComplete;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }

  changeDate(date) {
    this.dueDate = date;
  }

  changePrioirity(newPriority) {
    this.priority = newPriority;
  }

  changeDiscription(newDiscription) {
    this.discription = newDiscription;
  }

  complete() {
    this.isComplete = true;
  }
}
