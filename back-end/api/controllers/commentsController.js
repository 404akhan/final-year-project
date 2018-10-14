'use strict';


var mongoose = require('mongoose'),
  Comment = mongoose.model('Comments');


exports.list_all_comments = function(req, res) {
  Comment.find({}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};


exports.create_a_comment = function(req, res) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};


exports.read_a_comment = function(req, res) {
  Comment.findById(req.params.commentId, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};


exports.rest_get = function(req, res) {
  var dict = {};

  if (req.query.entity)
    dict['entity'] = req.query.entity;
  if (req.query.year)
    dict['year'] = req.query.year;
  
  if (req.query.month)
    dict['month'] = req.query.month;
  if (req.query.day)
    dict['day'] = req.query.day;

  if (req.query.source)
    dict['source'] = req.query.source;
  if (req.query.sentiment)
    dict['sentiment'] = req.query.sentiment;


  var limit = 20; // default
  if (req.query.limit)  
    limit = parseInt(req.query.limit);


  Comment.find(dict, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  }).limit(limit);
};


exports.update_a_comment = function(req, res) {
  Comment.findOneAndUpdate({_id: req.params.commentId}, req.body, {new: true}, function(err, comment) {
    if (err)
      res.send(err);
    res.json(comment);
  });
};


exports.delete_a_comment = function(req, res) {
  Comment.remove({
    _id: req.params.commentId
  }, function(err, comment) {
    if (err)
      res.send(err);
    res.json({ message: 'Comment successfully deleted' });
  });
};


exports.count = function(req, res) {
  var dict = {};

  if (req.query.entity)
    dict['entity'] = req.query.entity;
  if (req.query.source)
    dict['source'] = req.query.source;

  if (req.query.year)
    dict['year'] = req.query.year;
  if (req.query.month)
    dict['month'] = req.query.month;

  Comment.find(dict, function(err, data) 
  { 
    if (err)
      res.send(err);
    
    var count_dict = {'positive': [], 'negative': []};
    for (var day = 0; day <= 31; day++)
    {
      count_dict['positive'].push(0);
      count_dict['negative'].push(0);
    }

    for (var d in data)
    {
      var day = data[d]['day'];
      var sentiment = data[d]['sentiment'];
      count_dict[sentiment][day] += 1;
    }


    var dataPointsPos = [['Date', 'Positive', 'Negative']];
    var sentiments = ["positive", "negative"];

    for (var day = 1; day <= 31; day++)
    {
      var point = ["" + dict['year'] + "-" + dict['month'] + "-" + day];
      
      for (var i in sentiments)
      {
        var sentiment = sentiments[i];
        point.push(count_dict[sentiment][day]);
      }
      dataPointsPos.push(point);
    }

    res.json(dataPointsPos);    
  });
};

