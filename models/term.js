const mongoose = require("mongoose");

const TermSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  definition: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
});

const Term = mongoose.model("Term", TermSchema);

module.exports = Term;