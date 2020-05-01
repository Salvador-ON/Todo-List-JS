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

// CONCATENATED MODULE: ./src/DomManipulation.js

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
    console.log(Object.keys(projects));
    document.getElementById('taskTitle').innerHTML = '';
    const title = document.getElementById('taskTitle');
    title.innerHTML = 'All my tasks';
    document.getElementById('tasksLists').innerHTML = '';
    Object.keys(projects).forEach(project => {
      Object.keys(projects[project]).forEach(task => {
        if (task !== 'name') {
          console.log(projects[project][task]);
          const button = document.createElement('button');
          button.type = 'button';
          button.id = `${projects[project][task].project}-${projects[project][task].title}`;
          button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold d-flex justify-content-between';
          button.classList.add(DomManipulation_DomMan.displayColor(projects[project][task].priority));
          button.innerHTML = `<span>${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
          button.addEventListener('click', function ddata() {
            DomManipulation_DomMan.displayData(this.id, projects);
          });
          document.getElementById('tasksLists').appendChild(button);
        }
      });
    });
  }

  // method to display the specific information of each task
  // when we click in. it display it in a modal
  static displayData(data, projects) {
    const array = data.split('-');
    $('#exampleModalCenter').modal('show');
    const title = document.getElementById('exampleModalCenterTitle');
    title.innerHTML = projects[array[0]][array[1]].title;
    title.classList.add('text-capitalize');
    const description = document.getElementById('descriptionDisplay');
    const category = document.getElementById('categoryDisplay');
    const priority = document.getElementById('priorityDisplay');
    const date = document.getElementById('dateDisplay');
    const complete = document.getElementById('completeDisplay');
    description.innerHTML = projects[array[0]][array[1]].description;
    priority.innerHTML = projects[array[0]][array[1]].priority;
    date.innerHTML = projects[array[0]][array[1]].date;
    complete.innerHTML = projects[array[0]][array[1]].done;
    category.innerHTML = projects[array[0]][array[1]].project;
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
  static specificTask(projects, project) {
    document.getElementById('tasksLists').innerHTML = '';
    document.getElementById('taskTitle').innerHTML = '';
    const title = document.getElementById('taskTitle');
    title.innerHTML = `${project}`;
    Object.keys(projects[project]).forEach(task => {
      if (task !== 'name') {
        console.log(projects[project][task]);
        const button = document.createElement('button');
        button.type = 'button';
        button.id = `${projects[project][task].project}-${projects[project][task].title}`;
        button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold d-flex justify-content-between';
        button.classList.add(DomManipulation_DomMan.displayColor(projects[project][task].priority));
        button.innerHTML = `<span>${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
        button.addEventListener('click', function ddata() {
          DomManipulation_DomMan.displayData(this.id, projects);
        });
        document.getElementById('tasksLists').appendChild(button);
      }
    });
  }

  static addErrorMessage(errorMessage) {
    document.getElementById('info-div').className = 'alert alert-success w-100 alert-dismissible fade show';
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
}

/* harmony default export */ var DomManipulation = (DomManipulation_DomMan);
// CONCATENATED MODULE: ./src/LocalStorage.js
class LocalStorageWrapper {
  static getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static updateItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return this;
  }
}

/* harmony default export */ var LocalStorage = (LocalStorageWrapper);

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
    let projects = this.projects;
    for (var prop in projects) {
      if (projects.hasOwnProperty(prop)) return false;
    }
    
    return true;
  }

  fillDummyProjects() {}
}

/* harmony default export */ var src_Project = (Project);

// CONCATENATED MODULE: ./src/Task.js
class Task {
  constructor() {
    this.tasks = {};
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

  getAll() {
    return this.tasks;
  }

    static getAllByCategory(Category) {
      console.log('getAllByCategory' , 'categoryTasks');
    return this.tasks[Category];
  }
}

/* harmony default export */ var src_Task = (Task);

// CONCATENATED MODULE: ./src/index.js
// import _ from 'lodash';





class src_Logic {
  constructor() {
    this.projectObj = new src_Project(LocalStorage.getItem('projects'));
    this.taskObj = new src_Task();
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
      that.projectObj.add(projectName);
      LocalStorage.updateItem('projects', this.projectObj.getAll());
      DomManipulation.addInfoMessage(`${projectName} Category Addeed!`);
      DomManipulation.updateProjectList(this.projectObj.getAll());

    });
    const button2 = document.getElementById('buttonShowAll');
    button2.addEventListener('click', () => { DomManipulation.allMyTask(this.projects); });
  }

  // validate if the key word is saved on the local storgae
  // if not create template with basic projects
  initializeLocalStorage() {
    console.log('initializeLocalStorage' , this.projectObj.isEpmty() , this.projectObj.getAll());
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

      LocalStorage.updateItem('projects', this.projectObj.getAll());
      LocalStorage.updateItem('tasks', this.taskObj.getAll());
    }

    DomManipulation.updateProjectList(this.projectObj.getAll());
  }

  static listTasks(categrory) {
    alert(categrory);
  }
}

const toDo = new src_Logic();
toDo.initializeLocalStorage();
toDo.domInit();

/* harmony default export */ var src = __webpack_exports__["default"] = (src_Logic);

/***/ })
/******/ ]);