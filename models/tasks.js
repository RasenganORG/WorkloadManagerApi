class Task {
  constructor(id, asigneeId, taskId, projectId, taskCompleted, timeTracker, taskData) {
    this.id = id;
    this.asigneeId = asigneeId;
    this.taskId = taskId;
    this.projectId = projectId;
    this.taskStatus = taskCompleted
    this.timeTracker = timeTracker
    this.taskData = taskData
  }
}

module.exports = Task;