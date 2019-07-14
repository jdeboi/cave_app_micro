var express = require('express');
var router = express.Router();
var fs = require('fs');
var request = require('request');
var moment = require('moment');
const docs = require('../caveMongoDocs');

/* GET home page. */
router.get('/', function(req, res, next) {

  var data = docs.slice(0, 9);
  console.log("------------------------");
  console.log(docs[0], data);
  var times = [];
  for (var i = 0; i < data.length; i++) {
    times[i] = moment(data[i].tweet.created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('LL');
  }
  res.render('index', {
    title: 'Neural-Style Images',
    timeAgo: times,
    data: data
  });

});




module.exports = router;
