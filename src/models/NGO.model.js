const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    mobile: { type: Number, required: false },
    password: { type: String, required: false },
}, {
    timestamps: true
});


module.exports = mongoose.model("NGO", productsSchema);