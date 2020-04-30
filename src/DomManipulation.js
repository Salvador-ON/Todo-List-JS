class DomMan {
  //method to dispaly the project updated list we have the projects object as argument to make all the interactions inside
  static updateProjectList(projects) {
    document.getElementById('projectList').innerHTML = '';
    Object.keys(projects).forEach(project => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'list-group-item list-group-item-action text-capitalize';
      button.innerHTML = project;
      button.addEventListener('click', () => {
        DomMan.specificTask(projects, project);
      });
      document.getElementById('projectList').appendChild(button);
    });
  }

  //method to dispaly the list of task we have the projects object as argument to make all the interactions inside
  static allMyTask(projects) {
    console.log(Object.keys(projects));
    document.getElementById('taskTitle').innerHTML = '';
    let title = document.getElementById('taskTitle');
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
          button.classList.add(DomMan.displayColor(projects[project][task].priority));
          button.innerHTML = `<span>${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
          button.addEventListener('click', function ddata() {
            DomMan.displayData(this.id, projects);
          });
          document.getElementById('tasksLists').appendChild(button);
        }
      });
    });
  }

// method to display the specific information of each task when we click in. it display it in a modal
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
    let title = document.getElementById('taskTitle');
    title.innerHTML = `${project}`;
    Object.keys(projects[project]).forEach(task => {
      if (task !== 'name') {
        console.log(projects[project][task]);
        const button = document.createElement('button');
        button.type = 'button';
        button.id = `${projects[project][task].project}-${projects[project][task].title}`;
        button.className = 'list-group-item list-group-item-action text-capitalize text-white font-weight-bold d-flex justify-content-between';
        button.classList.add(DomMan.displayColor(projects[project][task].priority));
        button.innerHTML = `<span>${projects[project][task].title}</span><span>${projects[project][task].date}</span>`;
        button.addEventListener('click', function ddata() {
          DomMan.displayData(this.id, projects);
        });
        document.getElementById('tasksLists').appendChild(button);
      }
    });
  }
}

export default DomMan;