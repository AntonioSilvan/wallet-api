process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

import dotenv from 'dotenv';
import loadContainer from './container';
import { loadControllers } from 'awilix-express';
import express = require('express');

dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});


const app: express.Application = express();


loadContainer(app);

app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export { app };