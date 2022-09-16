class LoggedTime {
  constructor(id, userId, projectId, date, task) {
    this.id = id;
    this.userId = userId;
    this.projectId = projectId;
    this.date = date
    this.task = task
  }
}

module.exports = LoggedTime;