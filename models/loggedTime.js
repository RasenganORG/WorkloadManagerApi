class LoggedTime {
  constructor(userId, projectId, date, taskId, loggedHours, comment) {
    this.userId = userId;
    this.projectId = projectId;
    this.date = date
    this.task = {
      taskId,
      loggedHours,
      comment,
    }
  }
}

module.exports = LoggedTime;