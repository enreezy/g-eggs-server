const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
  sender: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Email = mongoose.model("email", EmailSchema);
