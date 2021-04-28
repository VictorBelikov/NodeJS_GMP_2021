import sequelize from '../data-access/sequelize.js';

import errorService from '../api/controllers/errorService.js';

export default async (userIds, groupId, userService, groupService) => {
  if (!Array.isArray(userIds)) {
    throw errorService(400, 'USERS must be an array of INT numbers');
  }

  return sequelize.transaction(async () => {
    const group = await groupService.getGroupById(groupId);
    const users = await Promise.all(userIds.map((id) => userService.getUserById(+id)));
    await group.addUsers(users);
    return group;
  });
};
