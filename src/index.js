// import _ from 'lodash';
import DomMan from './DomManipulation';
import LocalStorageWrapper from './LocalStorage';
import Project from './Project';
import Task from './Task';

class Logic {
  constructor() {
    this.projectObj = new Project(LocalStorageWrapper.getItem('projects'));
    this.taskObj = new Task();
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
    button2.addEventListener('click', () => { DomMan.allMyTask(this.projects); });
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  initializeLocalStorage() {
    if (this.projectObj.isEpmty())
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

  static listTasks(categrory) {
    alert(categrory);
  }
}

const toDo = new Logic();
toDo.initializeLocalStorage();
toDo.domInit();

export default Logic;