const DB = new Map();

class User {
  constructor(login, password, age) {
    this.login = login;
    this.password = password;
    this.age = age;
    this.isDeleted = false;
  }

  save() {
    if (DB.size > 0) {
      for (const [, user] of DB.entries()) {
        if (this.login === user.login) {
          const error = new Error('User with this login already exists in DB');
          error.statusCode = 400;
          throw error;
        }
      }
    }

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
