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

const { addUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getLoggedUser,
  updateUsersProject
} = require('../controllers/userController');

const {
  addBilling,
  getBillingOptions
} = require('../controllers/billingController')

const {
  addUTP,
  getUTP,
  updateUTP,
  deleteUTP,
  deleteProjectUTP,
  removeUsersFromUTPs
} = require('../controllers/user_task_projectController')

const router = express.Router();

//project routers
router.post('/project', addProject);
router.get('/projects', getAllProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);
router.put('/project/:id/add-task', addTask)
router.put('/project/:id/tasks/:taskId/delete', deleteTask);
router.put('/project/:id/tasks/:taskId', updateTask)

//user routes
router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/getLoggedUser/:email', getLoggedUser);
router.put('/users/:projectId', updateUsersProject)

//billing routes
router.post('/billing', addBilling);
router.get('/billing', getBillingOptions)

//user_task_project routes 
router.post('/user_task_project', addUTP)
router.get('/user_task_project', getUTP)
router.put('/user_task_project/:id', updateUTP)
router.delete('/user_task_project/:id', deleteUTP)
router.delete('/user_task_project/project-delete/:projectId', deleteProjectUTP)
router.put('/user_task_project/remove-users/:projectId', removeUsersFromUTPs)


module.exports = {
  routes: router
}