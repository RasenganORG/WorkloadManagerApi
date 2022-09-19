class UserProject {
  constructor(id, userId, projectId, availability) {
    this.id = id;
    this.userId = userId;
    this.projectId = projectId;
    this.availability = availability
  }
}

module.exports = UserProject;