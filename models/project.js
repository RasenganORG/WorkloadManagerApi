class Project {
	constructor(id, name, description, dueDate, creationDate,
			tasks, status ) {
					this.id = id;
					this.name = name;
					this.description = description;
					this.dueDate = dueDate;
					this.creationDate = creationDate;
					this.tasks = tasks;
					this.status = status
	}
}

module.exports = Project;