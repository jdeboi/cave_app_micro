var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var moment = require('moment');
const docs = require('../caveMongoDocs');

router.get('/:page', function(req, res, next) {
  var page = parseInt(req.params.page);
  console.log("------------------------");
  console.log("page: " + page);

  var data = docs.slice(page*12, page*12+12);
  console.log(docs.length);
  var times = [];
  for (var i = 0; i < data.length; i++) {
    times[i] = moment(data[i].tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('LL')
  }
  // console.log(data);
  // console.log("----------")
  // console.log(times)
  res.render('all',
  {
    title: 'Neural-Style Images',
    timeAgo: times,
    page: page+1,
    data: data
  });
});



module.exports = router;
