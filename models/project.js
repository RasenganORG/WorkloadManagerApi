class Project {
	constructor(id, title, description, dueDate, creationDate,
			tasks, status, usersAssigned, billingOption, colorLabel ) {
					this.id = id;
					this.title = title;
					this.description = description;
					this.dueDate = dueDate;
					this.creationDate = creationDate;
					this.tasks = tasks;
					this.status = status;
					this.usersAssigned = usersAssigned;
					this.billingOption = billingOption;
					this.colorLabel = colorLabel
	}
}

module.exports = Project;