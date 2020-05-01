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
    let projects = this.projects;
    for (var prop in projects) {
      if (projects.hasOwnProperty(prop)) return false;
    }
    
    return true;
  }

  fillDummyProjects() {}
}

export default Project;
