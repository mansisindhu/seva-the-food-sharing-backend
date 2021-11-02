const mongoose = require('mongoose');

const NGOSchema = new mongoose.Schema({
    NGOName: {type: String, required: true},
    reviews: {type: Number, required: true},
    totalCampaigns: {type: Number, required: true},
    totalFeeds: {type: Number, required: true},
    about: {type: String, required: true},
    image: {type: String, required: true},
    needFood: {type: Boolean, required: true},
    totalVolunteers: {type: Number, required: true}
})

module.exports = mongoose.model("ngos", NGOSchema);
