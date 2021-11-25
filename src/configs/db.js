const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ez6pn.mongodb.net/Seva?retryWrites=true&w=majority`
    );
  } catch (err) {
    console.log(err);
  }
};
