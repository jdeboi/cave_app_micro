var express = require('express');
var router = express.Router();
var RSS = require('rss');
var io = require('socket.io')();
const docs = require('../caveMongoDocs');
/* GET users listing. */


router.get('/', function(req, res, next) {
  // finding the latest upload that is done processing
  var data = docs.slice(0, 2);
  console.log("testing");
  console.log(global.locked);
  data = lastOne;
  imgStr = "twitter";
  if (process.env.MODE == "live") imgStr = "neural";
  var feed = new RSS({
    title:      'feed of cave',
    link: 'http://jdeboi.com',
    description: 'this page is necessary for importing neural-style images into Processing',
    custom_elements: [
      {image_url: 'http://paintingthecave.com/images/' + imgStr + '/'+data[0].id+ '.jpg'},
      {screenname: data[0].tweet.user.screenname},
      {name: data[0].tweet.user.name},
      {id: data[0].id},
      {prev_image_url: 'http://paintingthecave.com/images/' + imgStr + '/'+data[1].id+ '.jpg'},
      {prev_name: data[1].tweet.user.name},
      {prev_id: data[1].id},
      {neuralizing: global.locked}
    ]
  });

  res.set('Content-Type', 'text/xml');
  res.send(feed.xml());
});

module.exports = router;
