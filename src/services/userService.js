/* eslint-disable new-cap */
export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  getAllUsers() {
    return this.userModel.fetchAll();
  }

  getUserById(id) {
    return this.userModel.findById(id);
  }

  createUser(login, password, age) {
    console.log('Hello, world!');
    return new this.userModel(login, password, age).save();
  }

  updateUser(id, login, password, age) {
    return this.userModel.update(id, new this.userModel(login, password, age));
  }

  deleteUser(id) {
    return this.userModel.delete(id);
  }
}
