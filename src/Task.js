class Task {
  constructor() {
    this.tasks = {};
  }

  add(title, description, priority, date, done, project) {
    const task = {
      title,
      description,
      priority,
      date,
      done,
      project,
    };
    if (this.tasks[task.project] === undefined) {
      this.tasks[task.project] = {};
    }
    this.tasks[task.project][task.title] = task;
  }

  getAll() {
    return this.tasks;
  }

    static getAllByCategory(Category) {
      console.log('getAllByCategory' , 'categoryTasks');
    return this.tasks[Category];
  }
}

export default Task;
