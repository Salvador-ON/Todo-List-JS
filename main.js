/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/LocalStorage.js
class LocalStorageWrapper {
  static getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static updateItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return this;
  }

  // static removeTask(category , task){
  //   const tasks =  JSON.parse(localStorage.getItem('tasks'));
  //   console.log('all tasks ' , tasks);
  // }
}

/* harmony default export */ var LocalStorage = (LocalStorageWrapper);

// CONCATENATED MODULE: ./src/DomManipulation.js
// eslint-disable-next-line import/no-cycle



class DomManipulation_DomMan {
  // method to dispaly the project updated list
  // we have the projects object as argument to make all the interactions inside
  static updateProjectList(projects) {
    document.getElementById('projectList').innerHTML = '';
    Object.keys(projects).forEach(project => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-group-item list-group-item-action text-capitalize';
      button.innerHTML = project;
      button.addEventListener('click', () => {
        src.listTasks(project);
      });
      document.getElementById('projectList').appendChild(button);
    });
  }

  // method to dispaly the list of task
  // we have the projects object as argument to make all the interactions inside
  static allMyTask(projects) {
    document.getElementById('taskTitle').innerHTML = '';
    const title = document.getElementById('taskTitle');
    title.innerHTML = 'All my tasks';
    document.getElementById('tasksLists').innerHTML = '';
    Object.keys(projects).forEach(project => {
      Object.keys(projects[project]).forEach(task => {
        if (task !== 'name') {
          const button = document.createElement('button');
          button.type = 'button';
          button.id = `${projects[project][task].project}-${projects[project][task].title}`;
          button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold d-flex justify-content-between';
          button.classList.add(DomManipulation_DomMan.displayColor(projects[project][task].priority));
          button.innerHTML = `<span style = "text-decoration: line-through;">${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
          button.addEventListener('click', () => {
            DomManipulation_DomMan.displayData(projects[project][task], LocalStorage.getItem('projects'));
          });
          document.getElementById('tasksLists').appendChild(button);
        }
      });
    });
  }

  // method to display the specific information of each task
  // when we click in. it display it in a modal
  static displayData(taskDetails, projects) {
    $('#exampleModalCenter').modal('show');
    document.getElementById('buttonModal').innerHTML = '';
    const buttonModal = document.createElement('button');
    buttonModal.id = 'buttonUpdate';
    buttonModal.className = 'btn btn-primary';
    buttonModal.type = 'button';
    buttonModal.innerHTML = 'Update task';
    document.getElementById('buttonModal').appendChild(buttonModal);
    const title = document.getElementById('exampleModalCenterTitle');
    title.innerHTML = taskDetails.title;
    title.classList.add('text-capitalize');
    document.getElementById('taskCategory').innerHTML = '';
    Object.keys(projects).forEach(category => {
      const categoryOptions = document.createElement('option');
      categoryOptions.value = category;
      categoryOptions.innerHTML = category;
      document.getElementById('taskCategory').appendChild(categoryOptions);
    });

    document.getElementById('taskDescription').value = taskDetails.description;
    document.getElementById('taskCategory').value = taskDetails.project;
    document.getElementById('taskPriority').value = taskDetails.priority;
    document.getElementById('taskDate').value = taskDetails.date;
  }

  // METHOD TO OBTAIN THE bg-color class in relation to the prioritys of each task
  static displayColor(priority) {
    let x = '';
    switch (priority) {
      case 1:
        x = 'bg-danger';
        break;
      case 2:
        x = 'bg-warning';
        break;
      case 3:
        x = 'bg-success';
        break;
      default:
        x = 'bg-secondary';
    }
    return x;
  }

  // method to display the task of a specify category
  static specificTask(categories, category) {
    document.getElementById('buttonModal').innerHTML = '';
    const buttonModal = document.createElement('button');
    buttonModal.id = 'buttonUpdate';
    buttonModal.className = 'btn btn-primary';
    buttonModal.type = 'button';
    buttonModal.innerHTML = 'Update task';
    document.getElementById('buttonModal').appendChild(buttonModal);
    document.getElementById('tasksLists').innerHTML = '';
    document.getElementById('taskTitle').innerHTML = '';
    const title = document.getElementById('taskTitle');
    const logicobject = new src();

    title.innerHTML = `${category}`;
    if (category in categories) {
      Object.keys(categories[category]).forEach(task => {
        const tasktDetails = categories[category][task];
        const taskCompltedStyle = (tasktDetails.done) ? 'line-through' : 'none';
        if (task !== 'name') {
          const button = document.createElement('button');
          button.type = 'button';
          button.id = `${tasktDetails.project}-${tasktDetails.title}`;
          button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold';
          button.classList.add(DomManipulation_DomMan.displayColor(tasktDetails.priority));
          const checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';
          checkboxInput.checked = tasktDetails.done;
          checkboxInput.addEventListener('click', () => {
            logicobject.toggleTaskStatus(category, tasktDetails.title);
          });
          const taskTitleSpan = document.createElement('span');
          taskTitleSpan.style.textDecoration = taskCompltedStyle;
          taskTitleSpan.innerText = tasktDetails.title;
          checkboxInput.appendChild(taskTitleSpan);
          const dateSpan = document.createElement('span');
          dateSpan.className = 'float-right';
          dateSpan.innerText = tasktDetails.date;

          const removeSpan = document.createElement('i');
          removeSpan.className = 'fas fa-trash-alt px-2';
          removeSpan.addEventListener('click', () => {
            logicobject.removeTask(category, tasktDetails.title);
          });
          button.appendChild(checkboxInput);
          button.appendChild(taskTitleSpan);
          button.appendChild(dateSpan);
          dateSpan.appendChild(removeSpan);
          document.getElementById('tasksLists').appendChild(button);
        }
      });
    } else {
      const spanAlert = document.createElement('span');
      spanAlert.innerHTML = 'Empty Task List';
      document.getElementById('tasksLists').appendChild(spanAlert);
    }
  }

  static addErrorMessage(errorMessage) {
    document.getElementById('info-div').className = 'alert alert-danger w-100 alert-dismissible fade show';
    document.getElementById('result-message').innerHTML = errorMessage;
  }

  static addInfoMessage(infoMessage) {
    document.getElementById('info-div').className = 'alert alert-success w-100 alert-dismissible fade show';
    document.getElementById('result-message').innerHTML = infoMessage;
  }

  static flushInfoMessages() {
    const infoDiv = document.getElementById('info-div');
    infoDiv.className = 'd-none';
  }

  static newTaskModal(categories) {
    const logicObj = new src();
    $('#exampleModalCenter').modal('show');
    document.getElementById('buttonModal').innerHTML = '';
    const buttonModal = document.createElement('button');
    buttonModal.className = 'btn btn-primary';
    buttonModal.type = 'button';
    buttonModal.id = 'buttonNew';
    buttonModal.innerHTML = 'Save new task';
    buttonModal.addEventListener('click', () => {
      logicObj.createTask();
    });
    document.getElementById('buttonModal').appendChild(buttonModal);
    const title = document.getElementById('exampleModalCenterTitle');
    title.innerHTML = 'New task';
    title.classList.add('text-capitalize');
    const errorsDiv = document.createElement('div');
    errorsDiv.className = 'errorsDiv';
    document.getElementById('taskCategory').innerHTML = '';
    Object.keys(categories).forEach(category => {
      const categoryOptions = document.createElement('option');
      categoryOptions.value = category;
      categoryOptions.innerHTML = category;
      document.getElementById('taskCategory').appendChild(categoryOptions);
    });
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('taskPriority').value = '';
    document.getElementById('taskDate').value = '';
  }

  static showNewTaskErrors(errors) {
    const errorsDiv = document.getElementById('new-task-errors');
    errorsDiv.className = 'alert alert-danger';
    const olList = document.getElementById('errors-list');
    olList.innerHTML = '';
    errors.forEach((error) => {
      const errorList = document.createElement('li');
      errorList.innerHTML = error;
      olList.appendChild(errorList);
    });
    errorsDiv.appendChild(olList);
  }
}

/* harmony default export */ var DomManipulation = (DomManipulation_DomMan);
// CONCATENATED MODULE: ./src/Project.js
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

/* harmony default export */ var src_Project = (Project);

// CONCATENATED MODULE: ./src/Task.js
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

  setError(error) {
    this.errors.push(error);
    return true;
  }
}

/* harmony default export */ var src_Task = (Task);

// CONCATENATED MODULE: ./src/index.js
// import _ from 'lodash';
// eslint-disable-next-line import/no-cycle





class src_Logic {
  constructor() {
    this.projectObj = new src_Project(LocalStorage.getItem('projects'));
    this.taskObj = new src_Task(LocalStorage.getItem('tasks'));
  }

  // initialize the to do list
  domInit() {
    DomManipulation.updateProjectList(this.projectObj.getAll());
    this.addListener();
    DomManipulation.allMyTask(this.taskObj.getAll());
  }


  // Add a lsitener to the button so we can exceute the diferent methods
  addListener() {
    const that = this;
    const button = document.getElementById('buttonNewProject');
    button.addEventListener('click', () => {
      DomManipulation.flushInfoMessages();
      const projectName = document.getElementById('nameProject').value.toUpperCase();
      const projectsList = Object.keys(LocalStorage.getItem('projects'));
      if (projectName.length > 0 && !projectsList.includes(projectName)) {
        that.projectObj.add(projectName);
        LocalStorage.updateItem('projects', this.projectObj.getAll());
        DomManipulation.addInfoMessage(`${projectName} Category Addeed!`);
        DomManipulation.updateProjectList(this.projectObj.getAll());
      }
      if (projectsList.includes(projectName)) {
        DomManipulation.addErrorMessage('Category already exist');
      }

      if (projectName.length === 0) {
        DomManipulation.addErrorMessage('Category is empty');
      }
    });
    const button2 = document.getElementById('buttonShowAll');
    button2.addEventListener('click', () => { DomManipulation.allMyTask(LocalStorage.getItem('tasks')); });
    const button3 = document.getElementById('buttonNewTask');
    button3.addEventListener('click', () => { DomManipulation.newTaskModal(LocalStorage.getItem('projects')); });
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  initializeLocalStorage() {
    if (this.projectObj.isEpmty()) {
      this.projectObj.add('MOHAMED');
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

      LocalStorage.updateItem('projects', this.projectObj.getAll());
      LocalStorage.updateItem('tasks', this.taskObj.getAll());
    }

    DomManipulation.updateProjectList(this.projectObj.getAll());
  }

  static listTasks(category) {
    DomManipulation.specificTask(LocalStorage.getItem('tasks'), category);
  }

  removeTask(category, taskName) {
    this.taskObj.remove(category, taskName);
    LocalStorage.updateItem('tasks', this.taskObj.getAll());
    DomManipulation.addInfoMessage(`${taskName} Deleted Suucess !`);
    DomManipulation.specificTask(LocalStorage.getItem('tasks'), category);
  }

  toggleTaskStatus(category, taskName) {
    this.taskObj.toggleStatus(category, taskName);
    LocalStorage.updateItem('tasks', this.taskObj.getAll());
    DomManipulation.addInfoMessage(`${taskName} Updated Suucess !`);
    DomManipulation.specificTask(LocalStorage.getItem('tasks'), category);
  }

  createTask() {
    document.getElementById('errors-list').innerHTML = ' ';
    const taskTitle = document.getElementById('taskTitle').value;
    const taskCategory = document.getElementById('taskCategory').value;
    const taskDate = document.getElementById('taskDate').value;
    const taskPriority = parseInt(document.getElementById('taskPriority').value);
    const taskDescription = document.getElementById('taskDescription').value;

    if (this.taskObj.validateData(taskTitle, taskDescription, taskPriority,
      taskDate, taskCategory)) {
      DomManipulation.showNewTaskErrors(this.taskObj.getErrors());
    } else {
      this.taskObj.add(taskTitle, taskDescription, taskPriority, taskDate, 0, taskCategory);
      LocalStorage.updateItem('tasks', this.taskObj.getAll());
      $('#exampleModalCenter').modal('hide');
      DomManipulation.addInfoMessage(`${taskTitle} Task Added Suucess !`);
      DomManipulation.specificTask(LocalStorage.getItem('tasks'), taskCategory);
    }
  }
}

const toDo = new src_Logic();
toDo.initializeLocalStorage();
toDo.domInit();

/* harmony default export */ var src = __webpack_exports__["default"] = (src_Logic);

/***/ })
/******/ ]);