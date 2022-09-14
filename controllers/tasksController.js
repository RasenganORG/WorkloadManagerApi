'use strict';

const firebase = require('../db');
const Task = require('../models/tasks');
const firestore = firebase.firestore();

const addTask = async (req, res, next) => {
  try {
    const newDocument = firestore.collection('tasks').doc()
    const data = req.body;

    const taskWithId = {
      id: newDocument.id,
      ...data
    }

    await newDocument.set(taskWithId)

    res.send('Task entry saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getTask = async (req, res, next) => {
  try {
    const tasks = await firestore.collection('tasks');
    const data = await tasks.get();
    const tasksArray = [];

    if (data.empty) {
      res.status(404).send('No Task entries record found');
    } else {
      data.forEach(doc => {
        const task = new Task(
          doc.id,
          doc.data().userId,
          doc.data().taskId,
          doc.data().projectId,
          doc.data().taskCompleted
        )
        tasksArray.push(task)
      });
      res.send(tasksArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await firestore.collection('tasks');
    const data = await tasks.get();
    const tasksArray = [];

    if (data.empty) {
      res.status(404).send('No user');
    } else {
      data.forEach(doc => {
        const tasks = new Task(
          doc.id,
          doc.data().asigneeId,
          doc.data().taskId,
          doc.data().projectId,
          doc.data().taskCompleted,
          doc.data().timeTracker,
          doc.data().taskData
        );
        tasksArray.push(tasks);
      });
      res.send(tasksArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const task = await firestore.collection('tasks').doc(id);
    await task.update(data);

    res.send('Task record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection('tasks').doc(id).delete();
    res.send('Task deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//if an user/array of users was removed from a project, we would loop through the
//users_tasks_projects collection and remove the assignedUser Id, as the user
//is no longer part of the project
const removeUsersFromTasks = async (req, res, next) => {
  const batch = firestore.batch()
  const projectId = req.params.projectId;
  const usersToRemoveArr = req.body
  const projectsToUpdate = await firestore
    .collection('tasks')
    .where("projectId", "==", projectId)
    .get()

  if (projectsToUpdate.empty) {
    res.send('No tasks to update')
  } else {
    usersToRemoveArr.forEach((userIdToRemove, index) => {
      projectsToUpdate.forEach((project, index) => {
        const taskId = project.data().asigneeId
        if (taskId == userIdToRemove) {
          batch.update(project.ref, { asigneeId: "" })
        }
      })
    })

  }

  batch.commit()
    .then(() => res.send('Task items updated successfuly'))
    .catch(err => res.status(400).send(err.message))

}
//after a project was deleted we would remove all the tasks that 
//were linked to it from the users_tasks_projects collection
const deleteProjectTasks = async (req, res, next) => {
  const batch = firestore.batch()
  const projectId = req.params.projectId;
  const projectsToDelete = await firestore
    .collection('tasks')
    .where("projectId", "==", projectId)
    .get()

  projectsToDelete.forEach(doc => {
    batch.delete(doc.ref)
  });

  batch.commit()
    .then(() => res.send('Task items related to this project deleted successfuly'))
    .catch(err => res.status(400).send(err.message))
}


module.exports = {
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  deleteProjectTasks,
  removeUsersFromTasks
}
