const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  username: {
    type: String,
    required: ['true', 'please add a text field'],
  },
  text: {
    type: String,
    required: ['true', 'please add a text field'],
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('idea', ideaSchema);
