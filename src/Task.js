class Task {
  constructor(tasks) {
    this.tasks = tasks === null ? {} : tasks;
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

  remove(category, taskName) {

    console.log(this.tasks[category], category, taskName);
  }
}

export default Task;
