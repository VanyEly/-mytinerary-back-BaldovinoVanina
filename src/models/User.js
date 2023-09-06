const mongoose = require("mongoose");

const schemaUser = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  country: {type: String, required: true },

});

const User = mongoose.model("User", schemaUser);

module.exports = User;