Accounts.onCreateUser(function(options, user) {
  //adding user as a default role
  Roles.setRolesOnUserObj(user, ['user']);
  return user;

});
