const express = require("express");
const app = express();

app.use(express.json());

const NGOController = require("./controllers/NGO.controller");
app.use("/", NGOController);

module.exports = app;