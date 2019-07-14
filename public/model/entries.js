

var mongoose = require('mongoose');
var entrySchema = new mongoose.Schema({
  tweet: {
    id: Number,
    created_at: String,
    urlTwitter : String,
    user: {
      id: String,
      name: String,
      screenname: String
    }
  },
  download: Boolean,
  neural: Boolean,
  style: String
});

var Entry = mongoose.model('NeuralImage', entrySchema, 'entries');

module.exports = Entry;

/*
{ "tweet" :
  {
    "id" : 777217162016534500,
    "created_at" : "Sat Sep 17 18:46:26 +0000 2016",
    "urlTwitter" : "http://pbs.twimg.com/media/Csk640BVUAAxRQX.jpg",
    "url" : "http://pbs.twimg.com/media/Csk640BVUAAxRQX.jpg",
    "user" : {
      "id" : "777216184450035700",
      "name" : "Dev"
    }
  },
  "neural": false
}
*/
