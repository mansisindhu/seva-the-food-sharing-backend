const express = require("express");
const app = express();

app.use(express.json());

const dotenv = require("dotenv");
dotenv.config();

const connect = require("./src/configs/db");

const PORT = process.env.PORT || 2930;

app.listen(PORT, async () => {
    await connect();
    console.log("listening to port", PORT);
})