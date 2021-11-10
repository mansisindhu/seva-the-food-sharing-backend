const express = require("express");

const router = express.Router();

const NGO = require("../models/NGO.model")

router.get("/", async (req, res) => {
    const ngos = await NGO.find({}).lean().exec();

    res.status(200).send(ngos)
});

module.exports = router;