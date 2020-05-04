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

export default LocalStorageWrapper;
