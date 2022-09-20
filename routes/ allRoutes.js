const express = require('express');
const {
  addProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,

} = require('../controllers/projectController');

const {
  addUser,
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
  addTask,
  getTask,
  getAllTasks,
  updateTask,
  deleteTask,
  deleteProjectTasks,
  removeUsersFromTasks
} = require('../controllers/tasksController');

const { addLoggedTime,
  getAllLoggedTime,
  getLoggedTimeByTask,
  getLoggedTimeByProject
} = require('../controllers/loggedTimeController');

const {
  addUserProject,
  getUserProjects,
  getProjectUsers,
  getAllUserProjects,
  removeUserProjects,
  removeProjectUsers,
  removeUsersFromProject
} = require('../controllers/userProjectController');

const {
  addBacklogItem,
  getBacklogItems
} = require('../controllers/backlogController')
const {
  addSprint,
  getSprintsByProject
} = require('../controllers/sprintController')

const router = express.Router();

//project routers
router.post('/project', addProject);
router.get('/projects', getAllProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);


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

//tasks routes 
router.post('/tasks', addTask);
router.get('/tasks', getTask);
router.get('/tasks/get-all', getAllTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);
router.delete('/tasks/project-delete/:projectId', deleteProjectTasks);

//logged time routers
router.post('/loggedTime/add', addLoggedTime);
router.get('/loggedTime/getAll', getAllLoggedTime);
router.get('/loggedTime/byTask/:taskId', getLoggedTimeByTask);
router.get('/loggedTime/byProject/:projectId', getLoggedTimeByProject);

//user project routes
router.post('/userProject/add', addUserProject)
router.get('/userProject/getUserProjects/:userId', getUserProjects)
router.get('/userProject/getProjectUsers/:projectId', getProjectUsers)
router.get('/userProject/getAll', getAllUserProjects)
router.delete('/userProject/removeUserProjects/:projectId', removeUserProjects)
router.delete('/userProject/removeProjectUsers/:userId', removeProjectUsers)
router.delete('/userProject/removeUsersFromProject/', removeUsersFromProject)

//backlog routes 
router.post('/backlog/add', addBacklogItem)
router.get('/backlog/getAll', getBacklogItems)

//sprint routes
router.post('/sprint/add', addSprint)
router.get('/sprint/getSprintsByProject/:projectId', getSprintsByProject)
module.exports = {
  routes: router
}