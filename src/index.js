// import _ from 'lodash';
import DomMan from './DomManipulation';


class Logic {
  constructor() {
    this.projects = {};
  }

  // initialize the to do list
  domInit() {
    DomMan.updateProjectList(this.projects);
    this.addListener();
    DomMan.allMyTask(this.projects);
  }

  // Add a lsitener to the button so we can exceute the diferent methods
  addListener() {
    const that = this;
    const button = document.getElementById('buttonNewProject');
    button.addEventListener('click', () => { that.createProject(); });
    const button2 = document.getElementById('buttonShowAll');
    button2.addEventListener('click', () => { DomMan.allMyTask(this.projects); });
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  localStorageSaved() {
    if (localStorage.getItem('projects') !== null) {
      this.projects = JSON.parse(localStorage.getItem('projects'));
    } else {
      this.newProject('home');
      this.newProject('groceries');
      this.newProject('office');
      this.newProject('kids');

      this.newtask('milk', '4 liter', 1, '1-05-2020', false, 'groceries');
      this.newtask('chocolate', '2 bars', 2, '1-05-2020', false, 'groceries');
      this.newtask('flour', '1 kg', 3, '1-05-2020', false, 'groceries');

      this.newtask('finish budget', 'the presentation is on zoom', 3, '4-05-2020', false, 'office');
      this.newtask('Tv interview', 'prepare information', 2, '1-05-2020', false, 'office');

      this.newtask('Mike match', 'Central court avenue 125', 1, '7-05-2020', false, 'kids');

      localStorage.setItem('projects', JSON.stringify(this.projects));
    }
  }

  // update local storage after interaction
  localStorageUpdate() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  // method to create new projects each project has a name property and the tasks
  newProject(name) {
    const project = {
      name,
    };
    this.projects[project.name] = project;
    this.localStorageUpdate();
    DomMan.updateProjectList(this.projects);
  }

  // method that validate field value before we create new projects
  createProject() {
    const name = document.getElementById('nameProject').value;
    if (name !== '') {
      this.newProject(name);
      document.getElementById('nameProject').value = '';
    }
  }

  // method to create new task
  newtask(title, description, priority, date, done, project) {
    const task = {
      title,
      description,
      priority,
      date,
      done,
      project,
    };

    this.projects[task.project][task.title] = task;
    this.localStorageUpdate();
  }
}

const toDo = new Logic();
toDo.localStorageSaved();
toDo.domInit();
