import * as dotenv from 'dotenv';
import express = require('express')
import { handlerError } from './src/utils/errorHandler';
import http = require('http');

dotenv.config();
const app = express();

import cors = require('cors');
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints registration
import  { init } from './routes';
init(app);

app.use((err, req, res, next) => {
    handlerError(err, res);
});
export = app;
