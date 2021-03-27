const DB = new Map();

class User {
  constructor(login, password, age) {
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  save() {
    this.id = DB.size === 0 ? 1 : DB.size + 1;
    DB.set(this.id, this);
    return this;
  }

  static fetchAll() {
    return DB.size > 0 ? Array.from(DB.values()) : [];
  }

  static findById(id) {
    if (DB.size > 0 && DB.has(id)) {
      return DB.get(id);
    }
  }

  static update(id, updatedUser) {
    updatedUser.id = id;
    DB.set(id, updatedUser);
    return User.findById(id);
  }

  static delete(id) {
    const user = User.findById(id);
    user.isDeleted = true;
    return user;
  }
}

export default User;
