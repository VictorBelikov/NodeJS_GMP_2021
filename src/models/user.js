const DB = new Map();

// TODO: remove this dummy data
DB.set(1, {
  id: 1,
  login: 'login1',
  password: 'pass1',
  age: 21,
  isDeleted: false,
});
DB.set(2, {
  id: 2,
  login: 'login2',
  password: 'pass2',
  age: 22,
  isDeleted: false,
});
DB.set(3, {
  id: 3,
  login: 'login3',
  password: 'pass3',
  age: 23,
  isDeleted: false,
});
DB.set(4, {
  id: 4,
  login: 'login10',
  password: 'pass4',
  age: 24,
  isDeleted: false,
});
DB.set(5, {
  id: 5,
  login: 'login5',
  password: 'pass5',
  age: 25,
  isDeleted: false,
});

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
