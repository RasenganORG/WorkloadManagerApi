'use strict';

const firebase = require('../db');
const Project = require('../models/project');
const firestore = firebase.firestore();
const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;

const addProject = async (req, res, next) => {
  try {
    const batch = firestore.batch()
    const projectsDocument = firestore.collection('projects').doc()
    const userProjectDocument = firestore.collection('userProject')
    const backlogDocument = firestore.collection('backlog').doc()

    const { projectData, userData } = req.body

    //we add the new project to firebase
    batch.set(projectsDocument, projectData)

    userData.forEach(user => {
      //assign the project id to the userProject entry
      user.projectId = projectsDocument.id
      batch.set(userProjectDocument.doc(), user)
    })
    batch.set(backlogDocument, { backlogId: backlogDocument.id, projectId: projectsDocument.id })
    // await firestore.collection('projects').doc().set(data);
    // res.send('Project saved successfuly');
    batch.commit()
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await firestore.collection('projects');
    const data = await projects.get();
    const projectsArray = [];

    if (data.empty) {
      res.status(404).send('No project record found');
    } else {
      data.forEach(doc => {
        const project = new Project(
          doc.id,
          doc.data().title,
          doc.data().description,
          doc.data().estimatedWorkingTime,
          doc.data().creationDate,
          doc.data().status,
          doc.data().usersAssigned,
          doc.data().billingOption,
          doc.data().colorLabel
        );
        projectsArray.push(project);
      });
      res.send(projectsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const getProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const project = await firestore.collection('projects').doc(id);
    const data = await project.get();

    if (!data.exists) {
      res.status(404).send('Project with the given ID not found');
    } else {
      res.send(data.data());
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const project = await firestore.collection('projects').doc(id);
    await project.update(data);

    res.send('Project record updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const deleteProject = async (req, res, next) => {
  try {
    const id = req.params.id;

    await firestore.collection('projects').doc(id).delete();

    res.send('Project  deleted successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const addTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const project = await firestore.collection('projects').doc(id)

    await project.update({
      tasks: FieldValue.arrayUnion(data)
      //https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array for ref
    })

    res.send('Project tasks updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const updateTask = async (req, res, next) => {
  const id = req.params.id;
  const { currentTask, newTask } = req.body;
  const project = await firestore.collection('projects').doc(id)
  const batch = firestore.batch()

  batch.update(project, { tasks: FieldValue.arrayRemove(currentTask) })
  batch.update(project, { tasks: FieldValue.arrayUnion(newTask) })
  batch.commit()
    .then(() => res.send('Project tasks updated successfuly'))
    .catch(err => res.status(400).send(err.message))
}

const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const project = await firestore.collection('projects').doc(id)
    await project.update({
      tasks: FieldValue.arrayRemove(data)
      //https://firebase.google.com/docs/firestore/manage-data/add-data#update_elements_in_an_array for ref
    })
    res.send('Project tasks updated successfuly');
  } catch (error) {
    res.status(400).send(error.message);
  }
}

module.exports = {
  addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask
}
