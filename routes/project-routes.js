const express = require('express');
const { addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  addTask,
  updateTask,
  deleteTask
} = require('../controllers/projectController');

const router = express.Router();

router.post('/project', addProject);
router.get('/projects', getAllProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);
router.put('/projects/:id/add-task', addTask);
router.put('/projects/:id/tasks/:taskId', updateTask);


module.exports = {
  routes: router
}