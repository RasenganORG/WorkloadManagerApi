'use strict';

const firebase = require('../db');
const UserProject = require('../models/userProject')
const firestore = firebase.firestore();

const userProjectAdd = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('userProject').doc().set(data);
    res.send('UserProject added successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getUserProjects = async (req, res, next) => {
  try {
    // console.log(req.body.userId)
    const userId = req.body.userId
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
    const projectId = req.body.projectId
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

module.exports = {
  userProjectAdd,
  getUserProjects,
  getProjectUsers,
}