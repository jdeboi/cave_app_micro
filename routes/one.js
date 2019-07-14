var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var moment = require('moment');
const docs = require('../caveMongoDocs');

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  console.log("*****************")
  console.log("id: " + id);
  var data = docs.find(function(element) {
    return element.tid == id;
  });
  console.log(data);

  if (data == undefined) {
    res.status(400);
    res.render('oops', {
      message: "So sorry! This image has disappeared.",
      error: {}
    });
  }
  else {
    res.render('one', {
      title: 'Neural-Style Images',
      id: id,
      timeAgo: moment(data.tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('LL'),
      data: data
    });
  }
});




module.exports = router;
