import errorService from '../api/controllers/errorService.js';

export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async _getUserById(userId) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw errorService(404, `Could not find a user with id ${userId}!`);
    }
    return user;
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
      return { message: 'Fetched users successfully!', users };
    }
    throw errorService(404, 'Could not find Users in DB!');
  }

  async getUser(userId) {
    const user = await this._getUserById(userId);
    return { message: 'User fetched!', user };
  }

  async createUser(userInfo) {
    await this._checkUserByLogin(userInfo.login);
    const newUser = await this.userModel.create(userInfo);
    return { message: 'User created successfully!', createdUser: newUser };
  }

  async updateUser(id, userInfo) {
    await this._checkUserByLogin(userInfo.login);
    await this._updateUser(id, userInfo);
  }

  async deleteUser(userId) {
    await this._updateUser(userId, { isDeleted: true });
  }
}
