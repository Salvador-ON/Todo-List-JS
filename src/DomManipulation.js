import Logic from './index';
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
          button.classList.add(DomMan.displayColor(projects[project][task].priority));
          button.innerHTML = `<span style = "text-decoration: line-through;">${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
          // button.addEventListener('click', function ddata() {
          //   DomMan.displayData(projects[project][task]);
          // });
          document.getElementById('tasksLists').appendChild(button);
        }
      });
    });
  }

  // method to display the specific information of each task
  // when we click in. it display it in a modal
  static displayData(taskDetails) {
    $('#exampleModalCenter').modal('show');

    const title = document.getElementById('exampleModalCenterTitle');
    title.innerHTML = taskDetails.title;
    title.classList.add('text-capitalize');

    const description = document.getElementById('descriptionDisplay');
    const category = document.getElementById('categoryDisplay');
    const priority = document.getElementById('priorityDisplay');
    const date = document.getElementById('dateDisplay');
    const complete = document.getElementById('completeDisplay');

    description.innerHTML = taskDetails.description;
    priority.innerHTML = taskDetails.priority;
    date.innerHTML = taskDetails.date;
    complete.checked = taskDetails.done;
    category.innerHTML = taskDetails.project;
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
    document.getElementById('tasksLists').innerHTML = '';
    document.getElementById('taskTitle').innerHTML = '';
    const title = document.getElementById('taskTitle');
    title.innerHTML = `${category}`;
    //  console.log(categoryTasks ,'category task')
    if (category in categories) {
      Object.keys(categories[category]).forEach(task => {
        const tasktDetails = categories[category][task];
        const taskCompltedStyle = (tasktDetails.done)?'line-through':'none';
        if (task !== 'name') {
          const button = document.createElement('button');
          button.type = 'button';
          button.id = `${tasktDetails.project}-${tasktDetails.title}`;
          button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold';
          button.classList.add(DomMan.displayColor(tasktDetails.priority));
          // button.innerHTML = `<input type='checkbox'> <span style= 'text-decoration: ${taskCompltedStyle};'>${tasktDetails.title}</span><span class="float-right">${tasktDetails.date}<i class="fas fa-trash-alt px-2" onClick="Logic.removeTask('asd','asd2');"></i></span>`;
          const checkboxInput = document.createElement('input');
          checkboxInput.type = 'checkbox';

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
            const logicobject = new Logic();
            console.log(logicobject.removeTask('moahmed' , 'naser') , 'instance');
            Logic.removeTask('asd', 'moahmed');
          });
          button.appendChild(checkboxInput);
          button.appendChild(taskTitleSpan);
          button.appendChild(dateSpan);
          dateSpan.appendChild(removeSpan);

          // button.addEventListener('click', function ddata() {
          //   DomMan.displayData(tasktDetails);
          // });
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

export default DomMan;