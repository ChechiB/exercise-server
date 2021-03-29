"use strict";
var dotenv = require("dotenv");
var express = require("express");
var errorHandler_1 = require("./src/utils/errorHandler");
dotenv.config();
var app = express();
var cors = require("cors");
app.use(cors());
// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Endpoints registration
var routes_1 = require("./routes");
routes_1.init(app);
app.use(function (err, req, res, next) {
    errorHandler_1.handlerError(err, res);
});
module.exports = app;
