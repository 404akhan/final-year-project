'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// entity, year, month, day, comment, class, sent_score, source
// String, Number, Number, Number, String, String enum, Number, String


var CommentSchema = new Schema({
  entity: {
    type: String,
    required: 'required field entity'
  },
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  day: {
    type: Number
  },
  comment: {
    type: String
  },
  sentiment: {
    type: String,
    enum: ['negative', 'positive'],
    required: 'required field sentiment'
  },
  sent_score: {
    type: Number
  },
  source: {
    type: String
  }  
});

module.exports = mongoose.model('Comments', CommentSchema);