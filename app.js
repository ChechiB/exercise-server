const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints registration
//require('./routes')(app);

module.exports = app;