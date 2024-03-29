'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
// const userRoutes = require('./routes/user-routes');
// const projectRoutes = require('./routes/project-routes');
const AllRoutes = require('./routes/ allRoutes'); //todo: find a better way to combine all routes
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api', AllRoutes.routes);


app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
