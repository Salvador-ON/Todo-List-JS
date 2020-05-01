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
    return this.projects === null;
  }

  fillDummyProjects() {}
}

export default Project;
