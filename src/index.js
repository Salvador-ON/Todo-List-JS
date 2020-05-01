// import _ from 'lodash';
import DomMan from './DomManipulation';
import LocalStorageWrapper from './LocalStorage';
import Project from './Project';
import Task from './Task';

class Logic {
  constructor() {
    this.projectObj = new Project();
    this.taskObj = new Task();
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
  initializeLocalStorage() {
    if (this.projectObj.isEpmty)
    {
      this.projectObj.add('mohamed');
      this.projectObj.add('home2');
      this.projectObj.add('groceries');
      this.projectObj.add('office');
      this.projectObj.add('kids');

      this.taskObj.add('milk', '4 liter', 1, '1-05-2020', false, 'groceries');
      this.taskObj.add('chocolate', '2 bars', 2, '1-05-2020', false, 'groceries');
      this.taskObj.add('flour', '1 kg', 3, '1-05-2020', false, 'groceries');

      this.taskObj.add('finish budget', 'the presentation is on zoom', 3, '4-05-2020', false, 'office');
      this.taskObj.add('Tv interview', 'prepare information', 2, '1-05-2020', false, 'office');

      this.taskObj.add('Mike match', 'Central court avenue 125', 1, '7-05-2020', false, 'kids');

      LocalStorageWrapper.updateItem('projects', this.projectObj.getAll());
      LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
    }

    DomMan.updateProjectList(this.projectObj.getAll());
  }

  // update local storage after interaction
  localStorageUpdate() {
    localStorage.setItem('projects', JSON.stringify(this.projectObj.getAll()));
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
      Project.add(name);
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
toDo.initializeLocalStorage();
toDo.domInit();
