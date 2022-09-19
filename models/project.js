class Project {
  constructor(id, title, description, estimatedWorkingTime, creationDate,
    status, usersAssigned, billingOption, colorLabel) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.estimatedWorkingTime = estimatedWorkingTime;
    this.creationDate = creationDate;
    this.status = status;
    this.usersAssigned = usersAssigned;
    this.billingOption = billingOption;
    this.colorLabel = colorLabel
  }
}

module.exports = Project;