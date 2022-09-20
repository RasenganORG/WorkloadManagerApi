'use strict';

const firebase = require('../db');
const Backlog = require('../models/backlog');
const firestore = firebase.firestore();

const addSprint = async (req, res, next) => {
  try {

    const newDocument = firestore.collection('sprint').doc()
    const data = req.body;

    const sprintWithId = {
      sprintId: newDocument.id,
      ...data
    }

    await newDocument.set(sprintWithId)
    res.send('Sprint entry saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getSprintsByProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId
    const sprintItems = await firestore.collection('sprint').get();
    const sprintArray = [];

    if (sprintItems.empty) {
      res.status(404).send('No sprint items');
    } else {
      sprintItems.forEach(doc => {
        if (doc.data().projectId === projectId) {
          sprintArray.push(doc.data());

        }
      });
      res.send(sprintArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addSprint,
  getSprintsByProject
}