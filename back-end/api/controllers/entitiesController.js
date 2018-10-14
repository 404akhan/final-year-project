'use strict';


var mongoose = require('mongoose'),
  Entity = mongoose.model('Entities');


exports.list_all_entities = function(req, res) {
  Entity.find({}, function(err, entities) {
    if (err)
      res.send(err);
    res.json(entities);
  });
};


exports.create_entity = function(req, res) {
  var entity = new Entity(req.body);
  entity.save(function(err, entity) {
    if (err)
      res.send(err);
    res.json(entity);
  });
};

