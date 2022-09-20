'use strict';

const firebase = require('../db');
const Backlog = require('../models/backlog');
const firestore = firebase.firestore();

const addBacklogItem = async (req, res, next) => {
  try {
    const newDocument = firestore.collection('backlog').doc()
    const data = req.body;

    const backlogWithId = {
      id: newDocument.id,
      ...data
    }

    await newDocument.set(backlogWithId)
    res.send('Backlog entry saved successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getBacklogItems = async (req, res, next) => {
  try {
    const backlogItems = await firestore.collection('backlog').get();
    const backlogArray = [];

    if (backlogItems.empty) {
      res.status(404).send('No backlog items');
    } else {
      backlogItems.forEach(doc => {
        backlogArray.push(doc.data());
      });
      res.send(backlogArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addBacklogItem,
  getBacklogItems
}