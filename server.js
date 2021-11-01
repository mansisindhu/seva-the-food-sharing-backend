const express = require('express');
const mongoose = require('mongoose');
// const connect = require('./config/');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})

app.listen(4000, async() =>{
  

    console.log("Connected to DB and Running on port 4000")
})