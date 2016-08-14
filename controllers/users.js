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

function update(req, res, next) {
  if (req.params.id != req.token.user) {
    res.json({error: "Wrong user in token"});
  }
  else {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.json({message: `Could not find user because ${err}`});
      }
      else if (!user) {
        res.json({message: "No user with this id."});
      }
      else {
        user.name = req.body.name;
        user.address = req.body.address;
        user.city = req.body.city;
        user.state = req.body.state;
        user.zip = req.body.zip;
        user.preferred_animal = req.body.animal;
        user.save();
      };
    });
  };
};

module.exports = {
  index: index,
  show:  show,
  update: update,
};