const express = require('express');
const { addProject,
	getAllProjects,
	getProject,
	updateProject,
	deleteProject
} = require('../controllers/projectController');

const { addUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
	getLoggedUser
} = require('../controllers/userController');


const router = express.Router();

router.post('/project', addProject);
router.get('/projects', getAllProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);

router.post('/user', addUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/getLoggedUser/:email', getLoggedUser);

module.exports = {
	routes: router
}