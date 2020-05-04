// import _ from 'lodash';
import DomMan from './DomManipulation';
import LocalStorageWrapper from './LocalStorage';
import Project from './Project';
import Task from './Task';

class Logic {
  constructor() {
    this.projectObj = new Project(LocalStorageWrapper.getItem('projects'));
    this.taskObj = new Task(LocalStorageWrapper.getItem('tasks'));
  }

  // initialize the to do list
  domInit() {
    DomMan.updateProjectList(this.projectObj.getAll());
    this.addListener();
    DomMan.allMyTask(this.taskObj.getAll());
  }


  // Add a lsitener to the button so we can exceute the diferent methods
  addListener() {
    const that = this;
    const button = document.getElementById('buttonNewProject');
    button.addEventListener('click', () => {
      DomMan.flushInfoMessages();
      const projectName = document.getElementById('nameProject').value.toUpperCase();
      that.projectObj.add(projectName);
      LocalStorageWrapper.updateItem('projects', this.projectObj.getAll());
      DomMan.addInfoMessage(`${projectName} Category Addeed!`);
      DomMan.updateProjectList(this.projectObj.getAll());
    });
    const button2 = document.getElementById('buttonShowAll');
    button2.addEventListener('click', () => { DomMan.allMyTask(LocalStorageWrapper.getItem('tasks')); });
    const button3 = document.getElementById('buttonNewTask');
    button3.addEventListener('click', () => { DomMan.newTaskModal(LocalStorageWrapper.getItem('projects')); }); 
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  initializeLocalStorage() {
    if (this.projectObj.isEpmty()) {
      this.projectObj.add('Mohamed');
      this.projectObj.add('Home2');
      this.projectObj.add('Groceries');
      this.projectObj.add('Office');
      this.projectObj.add('Kids');

      this.taskObj.add('milk', '4 liter', 1, '2020-05-01', false, 'Groceries');
      this.taskObj.add('chocolate', '2 bars', 2, '2020-05-11', true, 'Groceries');
      this.taskObj.add('flour', '1 kg', 3, '2020-05-01', true, 'Groceries');

      this.taskObj.add('finish budget', 'the presentation is on zoom', 3, '2020-05-08', false, 'Office');
      this.taskObj.add('Tv interview', 'prepare information', 2, '2020-05-06', false, 'Office');

      this.taskObj.add('Mike match', 'Central court avenue 125', 1, '2020-05-01', false, 'Kids');

      LocalStorageWrapper.updateItem('projects', this.projectObj.getAll());
      LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
    }

    DomMan.updateProjectList(this.projectObj.getAll());
  }

  static listTasks(category) {
    DomMan.specificTask(LocalStorageWrapper.getItem('tasks'), category);
  }

  removeTask(category, taskName) {
    this.taskObj.remove(category, taskName);
    LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
  }
}

const toDo = new Logic();
toDo.initializeLocalStorage();
toDo.domInit();

export default Logic;