// Require resource's model(s).
// var Shelter = require("../models/shelter");
var rp = require("request-promise");

function index(req, res, next) {
  // Shelter.find({}, function(err, shelters) {
  //   if (err) {
  //     res.json({message: err});
  //   }
  //   else {
  //     res.json(shelters);
  //   };
  // });
};

function show(req, res, next) {
  // Shelter.findById(req.params.id, function(err, shelter) {
  //   if (err) {
  //     res.json({message: `Could not find shelter because ${err}`});
  //   }
  //   else {
  //     res.json(shelter);
  //   };
  // });
};

function create(req, res, next) {
  // var shelter = new Shelter({
  //   name: req.body.name;
  // });
  // shelter.save(function(err, shelter) {
  //   if (err) res.json({message: `failed to save shelter to database ${err}`});
  //   else {res.json(shelter)};
  // });
};

function update(req, res, next) {
  // Shelter.findById(req.params.id, function(err, shelter) {
  //   if (err) {
  //     res.json({message: `Could not find user because ${err}`});
  //   }
  //   else if (!shelter) {
  //     res.json({message: `No shelter with id ${req.params.id}`});
  //   }
  //   else {
  //     if(req.body.name) shelter.name = req.body.name;
  //     shelter.save(function(err, shelter) {
  //       if (err) {
  //         res.json({message: err});
  //       }
  //       else {
  //         res.json(shelter);
  //       }
  //     });
  //   };
  // });
};

function destroy(req, res, next) {
  // Shelter.findByIdAndRemove(req.params.id, function(err, shelter) {
  //   if (err) {
  //     res.json({message: `Could not find and delete shelter because ${err}`});
  //   }
  //   else {
  //     res.json({message: `Successfully deleted shelter ${req.params.id}`});
  //   }
  // });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  delete: destroy
}