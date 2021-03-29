export default (loginSubstring, limit, allUsers) =>
  allUsers
    .slice(0, (limit || allUsers.length))
    .filter((user) => user.login.includes(loginSubstring))
    .sort((a, b) => {
      if (a.login > b.login) {
        return 1;
      }
      if (a.login < b.login) {
        return -1;
      }
      return 0;
    });
