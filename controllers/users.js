// Require resource's model(s).
var User = require("../models/user");
var rp = require("request-promise");

var index = function(req, res, next){
  User.find({}, function(err, users) {
    if (err) {
      res.json({message: err});
    } else {
      res.json(users);
    }
  });
};

var show = function(req, res, next){
  if (req.params.id != req.token.user) {
    res.json({ error: "Wrong user in token" })
  }
  else {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.json({message: 'Could not find user because ' + err});
      } else if (!user) {
        res.json({message: 'No user with this id.'});
      } else {
        res.json(user);
      }
    });
  }
};

var post = function(req, res, next) {
  rp.get("http://jsonplaceholder.typicode.com/posts/1")
    .then(function(data) {
      res.json(data);
    })
}

module.exports = {
  index: index,
  show:  show,
  post: post
};