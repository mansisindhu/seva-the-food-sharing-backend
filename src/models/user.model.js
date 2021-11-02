const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: false},
    name: {type: String, required: true},
    profilePic: {type: String, required: false},
    donations: [{type: mongoose.Schema.Types.ObjectId, ref: "ngos", required: false}]
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model("user", userSchema); // users