'use strict';

const firebase = require('../db');
const LoggedTime = require('../models/loggedTime');
const firestore = firebase.firestore();

const addLoggedTime = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection('loggedTime').doc().set(data);
    res.send('Logged time added successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllLoggedTime = async (req, res, next) => {
  try {
    const loggedTime = await firestore.collection('loggedTime');
    const data = await loggedTime.get();
    const loggedTimeArray = [];
    if (data.empty) {
      res.status(404).send('No logged time entries record found');
    } else {
      data.forEach(doc => {
        const loggedTimeObj = new LoggedTime(
          doc.id,
          doc.data().userId,
          doc.data().projectId,
          doc.data().date,
          doc.data().task
        );
        loggedTimeArray.push(loggedTimeObj);

      });
      res.send(loggedTimeArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const getLoggedTimeByTask = async (req, res, next) => {
  try {
    console.log(req.params.taskId)
    const taskId = req.params.taskId
    const loggedTime = await firestore.collection('loggedTime');
    const data = await loggedTime.get();
    const loggedTimeArray = [];
    if (data.empty) {
      res.status(404).send('No logged time entries record found');
    } else {
      data.forEach(doc => {
        if (doc.data().task.taskId === taskId) {
          const loggedTimeObj = new LoggedTime(
            doc.id,
            doc.data().userId,
            doc.data().projectId,
            doc.data().date,
            doc.data().task
          );
          loggedTimeArray.push(loggedTimeObj);
        }


      });
      res.send(loggedTimeArray);

    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}
const getLoggedTimeByProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId
    const loggedTime = await firestore.collection('loggedTime');
    const data = await loggedTime.get();
    const loggedTimeArray = [];
    if (data.empty) {
      res.status(404).send('No logged time entries record found');
    } else {
      data.forEach(doc => {
        if (doc.data().projectId === projectId) {
          const loggedTimeObj = new LoggedTime(
            doc.id,
            doc.data().userId,
            doc.data().projectId,
            doc.data().date,
            doc.data().task
          );
          loggedTimeArray.push(loggedTimeObj);
        }



      });
      res.send(loggedTimeArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addLoggedTime,
  getAllLoggedTime,
  getLoggedTimeByTask,
  getLoggedTimeByProject
}