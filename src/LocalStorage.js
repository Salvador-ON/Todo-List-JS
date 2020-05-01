class LocalStorageWrapper {
  static getItem(key) {
    return localStorage.getItem(key);
  }

  static updateItem(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    return this;
  }
}

export default LocalStorageWrapper;
