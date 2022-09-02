'use strict';

const firebase = require('../db');
const User = require('../models/user');
const User_task_project = require('../models/user_task_project');
const firestore = firebase.firestore();

//UTP = user_task_project
const addUTP = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('users_tasks_projects').doc().set(data);
    res.send('user_task_project entry saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getUTP = async (req, res, next) => {
  try {
    const users_tasks_projects = await firestore.collection('users_tasks_projects');
    const data = await users_tasks_projects.get();
    const utpArray = [];

    if (data.empty) {
      res.status(404).send('No user_task_project entries record found');
    } else {
      data.forEach(doc => {
        const user_task_project = new User_task_project(
          doc.id,
          doc.data().userId,
          doc.data().taskId,
          doc.data().projectId
        )
        utpArray.push(user_task_project)
      });
      res.send(utpArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateUTP = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const utp = await firestore.collection('users_tasks_projects').doc(id);
    await utp.update(data);

    res.send('Project record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteUTP = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection('users_tasks_projects').doc(id).delete();
    res.send('User_task_project entry deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const removeUsersFromUTPs = async (req, res, next) => {
  const batch = firestore.batch()
  const projectId = req.params.projectId;
  const usersToRemoveArr = req.body
  const projectsToUpdate = await firestore
    .collection('users_tasks_projects')
    .where("projectId", "==", projectId)
    .get()

  usersToRemoveArr.forEach((userIdToRemove, index) => {
    projectsToUpdate.forEach((project, index) => {
      const utpId = project.data().userId
      if (utpId == userIdToRemove) {
        console.log(project.ref)
        batch.update(project.ref, { userId: "" })
      }
    })
  })

  batch.commit()
    .then(() => res.send('User_task_project items updatefd successfuly'))
    .catch(err => res.status(400).send(err.message))
}

const deleteProjectUTP = async (req, res, next) => {
  const batch = firestore.batch()
  const projectId = req.params.projectId;
  const projectsToDelete = await firestore
    .collection('users_tasks_projects')
    .where("projectId", "==", projectId)
    .get()

  projectsToDelete.forEach(doc => {
    batch.delete(doc.ref)
  });

  batch.commit()
    .then(() => res.send('User_task_project items related to this project deleted successfuly'))
    .catch(err => res.status(400).send(err.message))
}


module.exports = {
  addUTP,
  getUTP,
  updateUTP,
  deleteUTP,
  deleteProjectUTP,
  removeUsersFromUTPs
}
