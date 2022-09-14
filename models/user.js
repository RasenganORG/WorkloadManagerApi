class User {
  constructor(id, name, username, email, phoneNumber, avatar, projectsAssignedTo, loggedIn, plannedWorkload) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.projectsAssignedTo = projectsAssignedTo;
    this.loggedIn = loggedIn;
    this.plannedWorkload = plannedWorkload
  }
}

module.exports = User;