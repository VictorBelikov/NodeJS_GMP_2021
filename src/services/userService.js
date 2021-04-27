import errorService from '../api/controllers/errorService.js';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async _updateUser(id, userInfo) {
    const status = await this.userModel.update(userInfo, { where: { id } });
    if (!status[0]) {
      throw errorService(404, `User with id ${id} doesn't exist`);
    }
  }

  async _checkUserByLogin(newLogin) {
    const user = await this.userModel.findOne({ where: { login: newLogin } });
    if (user) {
      throw errorService(400, `User with login ${newLogin} already exists in DB`);
    }
  }

  async getAllUsers() {
    const users = await this.userModel.findAll();
    if (users.length > 0) {
      return users;
    }
    throw errorService(404, 'Could not find Users in DB!');
  }

  async getUserById(userId) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw errorService(404, `Could not find a user with id ${userId}!`);
    }
    return user;
  }

  async createUser(userInfo) {
    await this._checkUserByLogin(userInfo.login);
    return this.userModel.create(userInfo);
  }

  async updateUser(id, userInfo) {
    await this._checkUserByLogin(userInfo.login);
    await this._updateUser(id, userInfo);
  }

  async deleteUser(userId) {
    await this._updateUser(userId, { isDeleted: true });
  }
}
