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

  getAll() {
    return this.projects;
  }

  isEpmty() {
    const { projects } = this;
    if (Object.entries(projects).length === 0) return true;
    return false;
  }
}

export default Project;
