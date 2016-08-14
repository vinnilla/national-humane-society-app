// Require resource's model(s).
var User = require("../models/user");

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
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: 'Could not find user because ' + err});
    } else if (!user) {
      res.json({message: 'No user with this id.'});
    } else {
      res.json(user);
    }
  });
};

function update(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({message: `Could not find user because ${err}`});
    }
    else if (!user) {
      res.json({message: "No user with this id."});
    }
    else {
      if(req.body.name) user.name = req.body.name;
      if(req.body.address) user.address = req.body.address;
      if(req.body.city) user.city = req.body.city;
      if(req.body.state) user.state = req.body.state;
      if(req.body.zip) user.zip = req.body.zip;
      if(req.body.animal) user.preferred_animal = req.body.animal;
      user.save(function(err, user) {
        if (err) {
          res.json({error: err})
        }
        else {
          res.json(user);
        }
      });
    };
  });
};

function destroy(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) {
      res.json({message: `Could not find and delete user because ${err}`});
    }
    else {
      res.json({message: `Successfully deleted user ${req.params.id}`});
    }
  })
}

module.exports = {
  index: index,
  show:  show,
  update: update,
  delete: destroy
};