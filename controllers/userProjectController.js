'use strict';

const firebase = require('../db');
const UserProject = require('../models/userProject')
const firestore = firebase.firestore();


const addUserProject = async (req, res, next) => {
  try {
    const batch = firestore.batch()
    let userProject = firestore.collection('userProject')
    const data = req.body;
    data.forEach(user => {
      batch.set(userProject.doc(), user)
    })
    await batch.commit();
    res.send('UserProject added successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//remove all project entries 
const removeUserProjects = async (req, res, next) => {
  try {
    const projectId = req.params.projectId
    const batch = firestore.batch()
    const userProject = await firestore.collection('userProject').get()
    userProject.forEach(userProject => {
      if (userProject.data().projectId === projectId) {
        batch.delete(userProject.ref)
      }
    })
    await batch.commit();

    res.send('UserProject project entries deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

//delete all users entries
const removeProjectUsers = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const batch = firestore.batch()
    const userProject = await firestore.collection('userProject').get()
    userProject.forEach(userProject => {
      if (userProject.data().userId === userId) {
        batch.delete(userProject.ref)
      }
      // batch.set(userProject.doc(), user)
    })
    await batch.commit();

    res.send('UserProject user entries deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const removeUsersFromProject = async (req, res, next) => {
  try {
    const usersToRemove = req.body.usersToRemove;
    const projectId = req.body.projectId;

    const batch = firestore.batch()
    const userProject = await firestore.collection('userProject').get()
    usersToRemove.forEach(userToRemove => {
      userProject.forEach(userProject => {
        if (userProject.ref.id === userToRemove.id) {
          batch.delete(userProject.ref)
        }
      })
    })

    await batch.commit();

    res.send('UserProject user entries deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const getUserProjects = async (req, res, next) => {
  try {
    const userId = req.params.userId
    const userProject = await firestore.collection('userProject');
    const data = await userProject.get();
    const userProjectsArray = [];
    if (data.empty) {
      res.status(404).send('No UserProject entries record found');
    } else {
      data.forEach(doc => {
        if (doc.data().userId === userId) {
          const userProjectObj = new UserProject(
            doc.id,
            doc.data().userId,
            doc.data().projectId,
            doc.data().availability
          );
          userProjectsArray.push(userProjectObj);

        }
      });
      res.send(userProjectsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getProjectUsers = async (req, res, next) => {
  try {
    const projectId = req.params.projectId
    const userProject = await firestore.collection('userProject');
    const data = await userProject.get();
    const userProjectsArray = [];
    if (data.empty) {
      res.status(404).send('No UserProject entries record found');
    } else {
      data.forEach(doc => {
        if (doc.data().projectId === projectId) {
          const userProjectObj = new UserProject(
            doc.id,
            doc.data().userId,
            doc.data().projectId,
            doc.data().availability

          );
          userProjectsArray.push(userProjectObj);
        }
      });
      res.send(userProjectsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllUserProjects = async (req, res, next) => {
  try {
    const data = await firestore.collection('userProject').get();;

    const userProjectsArray = [];
    if (data.empty) {
      res.status(404).send('No UserProject entries record found');
    } else {
      data.forEach(doc => {
        const userProjectObj = new UserProject(
          doc.id,
          doc.data().userId,
          doc.data().projectId,
          doc.data().availability
        );
        userProjectsArray.push(userProjectObj);
      });
      res.send(userProjectsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
module.exports = {
  addUserProject,
  getUserProjects,
  getProjectUsers,
  getAllUserProjects,
  removeUserProjects,
  removeProjectUsers,
  removeUsersFromProject
}