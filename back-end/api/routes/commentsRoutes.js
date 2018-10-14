'use strict';

module.exports = function(app) {
  var commentsList = require('../controllers/commentsController');
  var entitiesList = require('../controllers/entitiesController');

  // comments Routes
  app.route('/comments')
    .get(commentsList.list_all_comments)
    .post(commentsList.create_a_comment);


  app.route('/comments/:commentId')
    .get(commentsList.read_a_comment)
    .put(commentsList.update_a_comment)
    .delete(commentsList.delete_a_comment);


  app.route('/rest')
    .get(commentsList.rest_get);


  app.route('/count')
    .get(commentsList.count);


  app.route('/entities')
    .get(entitiesList.list_all_entities)    
    .post(entitiesList.create_entity);
};
