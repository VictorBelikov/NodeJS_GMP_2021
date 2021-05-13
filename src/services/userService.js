export default class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async getUserByLogin(newLogin) {
    return this.userModel.findOne({ where: { login: newLogin } });
  }

  async getAllUsers() {
    return this.userModel.findAll();
  }

  async getUserById(userId) {
    return this.userModel.findByPk(userId);
  }

  async createUser(userInfo) {
    return this.userModel.create(userInfo);
  }

  async updateUser(id, userInfo) {
    return this.userModel.update(userInfo, { where: { id } });
  }

  async deleteUser(id) {
    return this.userModel.update({ isDeleted: true }, { where: { id } });
  }

  async getAutoSuggestUsers(loginSubstring, limit) {
    const allUsers = await this.getAllUsers();
    return allUsers
      .sort((a, b) => {
        if (a.login > b.login) {
          return 1;
        }
        if (a.login < b.login) {
          return -1;
        }
        return 0;
      })
      .filter((user) => user.login.includes(loginSubstring))
      .slice(0, limit || allUsers.length);
  }
}
