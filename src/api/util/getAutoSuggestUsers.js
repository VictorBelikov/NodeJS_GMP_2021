export default (loginSubstring, limit, allUsers) =>
  allUsers
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
