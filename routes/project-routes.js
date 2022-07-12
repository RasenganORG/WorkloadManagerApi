const express = require('express');
const {	addProject,
	getAllProjects,
	getProject,
	updateProject,
	deleteProject
} = require('../controllers/projectController');

const router = express.Router();

router.post('/project', addProject);
router.get('/projects', getAllProjects);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);
router.delete('/project/:id', deleteProject);


module.exports = {
	routes: router
}