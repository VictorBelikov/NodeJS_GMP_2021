const DB = [];

class User {
  constructor(login, password, age) {
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  save() {
    this.id = DB.length <= 0 ? 1 : DB[DB.length - 1].id + 1;
    DB.push(this);
    return this;
  }
}

export default User;
