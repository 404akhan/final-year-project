'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// entity, year, month, day, comment, class, sent_score, source
// String, Number, Number, Number, String, String enum, Number, String


var EntitySchema = new Schema({
  entity: {
    type: String,
    required: 'required field entity'
  }
});

module.exports = mongoose.model('Entities', EntitySchema);
