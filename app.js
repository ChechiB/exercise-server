const express = require('express');
const handleError = require('./src/utils/errorHandler')
const app = express();

const cors = require('cors');
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
    handleError(err, res);
});

// Endpoints registration
require('./routes')(app);

module.exports = app;