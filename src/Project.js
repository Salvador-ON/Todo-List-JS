class Project {
  constructor(projects) {
    this.projects = projects === null ? {} : projects;
  }

  add(name) {
    const project = {
      name,
    };
    this.projects[project.name] = project;
    return true;
  }

  update(key, data) {}

  getAll() {
    return this.projects;
  }

  isEpmty() {
    const { projects } = this;
    for (const prop in projects) {
      if (projects.hasOwnProperty(prop)) return false;
    }
    return true;
  }
}

export default Project;
