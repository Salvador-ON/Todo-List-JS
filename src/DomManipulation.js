// eslint-disable-next-line import/no-cycle
import Logic from './index';
import LocalStorageWrapper from './LocalStorage';

class DomMan {
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
        Logic.listTasks(project);
      });
      document.getElementById('projectList').appendChild(button);
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
    buttonModal.addEventListener('click', () => {
      const update = new Logic();
      update.updateTask(taskDetails);
    });
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
    document.getElementById('taskTitle').value = taskDetails.title;
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
    document.getElementById('AllTasks').innerHTML = '';
    const title = document.getElementById('AllTasks');
    const logicobject = new Logic();

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
          button.classList.add(DomMan.displayColor(tasktDetails.priority));
          const checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';
          checkboxInput.checked = tasktDetails.done;
          checkboxInput.addEventListener('click', () => {
            logicobject.toggleTaskStatus(category, tasktDetails.title);
          });
          const taskTitleSpan = document.createElement('span');
          taskTitleSpan.style.textDecoration = taskCompltedStyle;
          taskTitleSpan.innerText = tasktDetails.title;
          taskTitleSpan.className = 'button-info py-3';
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
          taskTitleSpan.addEventListener('click', () => {
            DomMan.displayData(tasktDetails, LocalStorageWrapper.getItem('projects'));
          });
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
    const logicObj = new Logic();
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

export default DomMan;