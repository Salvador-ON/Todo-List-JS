// import _ from 'lodash';
// eslint-disable-next-line import/no-cycle
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
  }


  // Add a lsitener to the button so we can exceute the diferent methods
  addListener() {
    const that = this;
    const button = document.getElementById('buttonNewProject');
    button.addEventListener('click', () => {
      DomMan.flushInfoMessages();
      const projectName = document.getElementById('nameProject').value.toUpperCase();
      const projectsList = Object.keys(LocalStorageWrapper.getItem('projects'));
      if (projectName.length > 0 && !projectsList.includes(projectName)) {
        that.projectObj.add(projectName);
        LocalStorageWrapper.updateItem('projects', this.projectObj.getAll());
        DomMan.addInfoMessage(`${projectName} Category Addeed!`);
        DomMan.updateProjectList(this.projectObj.getAll());
      }
      if (projectsList.includes(projectName)) {
        DomMan.addErrorMessage('Category already exist');
      }

      if (projectName.length === 0) {
        DomMan.addErrorMessage('Category is empty');
      }
    });
    const button3 = document.getElementById('buttonNewTask');
    button3.addEventListener('click', () => { DomMan.newTaskModal(LocalStorageWrapper.getItem('projects')); });
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  initializeLocalStorage() {
    if (this.projectObj.isEpmty()) {
      this.projectObj.add('HOME2');
      this.projectObj.add('GROCERIES');
      this.projectObj.add('OFFICE');
      this.projectObj.add('KIDS');

      this.taskObj.add('milk', '4 liter', 1, '2020-05-01', false, 'GROCERIES');
      this.taskObj.add('chocolate', '2 bars', 2, '2020-05-11', true, 'GROCERIES');
      this.taskObj.add('flour', '1 kg', 3, '2020-05-01', true, 'GROCERIES');

      this.taskObj.add('finish budget', 'the presentation is on zoom', 3, '2020-05-08', false, 'Office');
      this.taskObj.add('Tv interview', 'prepare information', 2, '2020-05-06', false, 'OFFICE');

      this.taskObj.add('Mike match', 'Central court avenue 125', 1, '2020-05-01', false, 'KIDS');

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
    DomMan.addInfoMessage(`${taskName} Deleted Suucess !`);
    DomMan.specificTask(LocalStorageWrapper.getItem('tasks'), category);
  }

  toggleTaskStatus(category, taskName) {
    this.taskObj.toggleStatus(category, taskName);
    LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
    DomMan.addInfoMessage(`${taskName} Updated Suucess !`);
    DomMan.specificTask(LocalStorageWrapper.getItem('tasks'), category);
  }

  createTask() {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskPriority = parseInt(document.getElementById('taskPriority').value, 10);
    const taskDescription = document.getElementById('taskDescription').value;
    if (this.taskObj.validateData(taskTitle, taskDescription, taskPriority,
      taskDate, taskCategory)) {
      DomMan.showNewTaskErrors(this.taskObj.getErrors());
    } else {
      this.taskObj.add(taskTitle, taskDescription, taskPriority, taskDate, 0, taskCategory);
      LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
      $('#exampleModalCenter').modal('hide');
      DomMan.addInfoMessage(`${taskTitle} Task Added Success !`);
      DomMan.specificTask(LocalStorageWrapper.getItem('tasks'), taskCategory);
    }
  }

  updateTask(taskDetails) {
    const taskTitle = document.getElementById('taskTitle').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskPriority = parseInt(document.getElementById('taskPriority').value, 10);
    const taskDescription = document.getElementById('taskDescription').value;
    if (this.taskObj.validateData(taskTitle, taskDescription, taskPriority,
      taskDate, taskCategory)) {
      DomMan.showNewTaskErrors(this.taskObj.getErrors());
    } else {
      if (taskTitle !== taskDetails.title || taskCategory !== taskDetails.project) {
        this.removeTask(taskDetails.project, taskDetails.title);
      }
      this.taskObj.add(taskTitle, taskDescription, taskPriority, taskDate, 0, taskCategory);
      LocalStorageWrapper.updateItem('tasks', this.taskObj.getAll());
      $('#exampleModalCenter').modal('hide');
      DomMan.addInfoMessage(`${taskTitle} Task Added Success !`);
      DomMan.specificTask(LocalStorageWrapper.getItem('tasks'), taskCategory);
    }
  }
}

const toDo = new Logic();
toDo.initializeLocalStorage();
toDo.domInit();

export default Logic;