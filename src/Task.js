class Task {
  constructor(tasks) {
    this.tasks = tasks === null ? {} : tasks;
    this.errors = [];
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

  validateData(title, description, priority, date, project) {
    this.errors = [];
    if (!title) this.setError('Title Shoud not be empty .');
    if (!description) this.setError('description Shoud not be empty . ');
    if (!priority) this.setError('priority Shoud not be empty . ');
    if (!date) this.setError('date Shoud not be empty . ');
    if (!project) this.setError('project Shoud not be empty . ');

    return this.haveErrors();
  }

  getAll() {
    return this.tasks;
  }

  remove(category, taskName) {
    delete this.tasks[category][taskName];
  }

  toggleStatus(category, taskName) {
    this.tasks[category][taskName].done = !this.tasks[category][taskName].done;
  }

  getErrors() {
    return this.errors;
  }

  haveErrors() {
    return (this.errors.length > 0);
  }

  flushErrors() {
    this.errors = [];
  }

  setError(error) {
    this.errors.push(error);
    return true;
  }

  
}

export default Task;
