// Require resource's model(s).
var Shelter = require("../models/shelter");
var rp = require("request-promise");
var User = require("../models/user");

function index(req, res, next) {
  Shelter.find({}, function(err, shelters) {
    if (err) {
      res.json({message: err});
    }
    else {
      res.json(shelters);
    };
  });
};

function show(req, res, next) {
  Shelter.findById(req.params.id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find shelter because ${err}`});
    }
    else {
      res.json(shelter);
    };
  });
};

function create(req, res, next) {
  var shelter = new Shelter({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    pets: [],
    description: req.body.description,
    phone: req.body.phone,
    email: req.body.email,
    userId: req.body.user_id
  });
  shelter.save(function(err, shelter) {
    console.log(shelter._id);
    if (err) res.json({message: `failed to save shelter to database ${err}`});
    else {
      User.findById(req.params.user_id, function(err, user) {
        if (err) {
          res.json({message: `Could not find user because ${err}`});
        }
        else {
          user.shelterId = shelter.id;
          user.save();
          res.json({msg: "creation successful", shelter:shelter});
        };
      })
    };
  });
};

function update(req, res, next) {
  Shelter.findById(req.params.id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find user because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      if(req.body.name) shelter.name = req.body.name;
      if(req.body.address) shelter.address = req.body.address;
      if(req.body.city) shelter.city = req.body.city;
      if(req.body.state) shelter.state = req.body.state;
      if(req.body.zip) shelter.zip = req.body.zip;
      if(req.body.description) shelter.description = req.body.description;
      if(req.body.phone) shelter.phone = req.body.phone;
      if(req.body.email) shelter.email = req.body.email;
      shelter.save(function(err, shelter) {
        if (err) {
          res.json({message: err});
        }
        else {
          res.json(shelter);
        }
      });
    };
  });
};

function destroy(req, res, next) {
  Shelter.findByIdAndRemove(req.params.id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find and delete shelter because ${err}`});
    }
    else {
      res.json({message: `Successfully deleted shelter ${req.params.id}`});
    }
    User.findById(shelter.userId, function(err, user) {
      user.shelterId = undefined;
      user.save();
    })
  });
};

function newpet(req, res, next) {
  Shelter.findById(req.params.id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find user because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      pet = {};
      if(req.body.name) pet.name = req.body.name;
      if(req.body.animal) pet.animal = req.body.animal;
      if(req.body.breed) pet.breed = req.body.breed;
      if(req.body.size) pet.size = req.body.size;
      if(req.body.sex) pet.sex = req.body.sex;
      if(req.body.age) pet.age = req.body.age;
      shelter.pets.push(pet);
      shelter.save(function(err, shelter) {
        if (err) {
          res.json({message: err});
        }
        else {
          res.json(shelter);
        }
      });
    };
  });
};

function showpets(req, res, next) {
  Shelter.findById(req.params.id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find shelter because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      res.json(shelter.pets);
    };
  });
};

function showpet(req,res,next) {
  Shelter.findById(req.params.shelter_id, function(err, shelter) {
  if (err) {
      res.json({message: `Could not find shelter because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      shelter.pets.forEach(function(pet, index) {
        if(pet._id == req.params.id) {
          res.json(pet);
        }
      })
    };
  });
}

function deletepet(req,res,next) {
  Shelter.findById(req.params.shelter_id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find user because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      shelter.pets.forEach(function(pet, index) {
        if (pet._id == req.params.id) {
          shelter.pets.splice(index, 1);
          shelter.save(function(err, shelter) {
            if (err) res.json({message: `Shelter could not be updated because ${err}`});
            else {
              res.json({message: `successfully deleted pet`});
            };
          });
        }; 
      });
    };
  });
};

function editpet(req,res,next) {
  Shelter.findById(req.params.shelter_id, function(err, shelter) {
    if (err) {
      res.json({message: `Could not find user because ${err}`});
    }
    else if (!shelter) {
      res.json({message: `No shelter with id ${req.params.id}`});
    }
    else {
      shelter.pets.forEach(function(pet, index) {
        if (pet._id == req.params.id) {
          if(req.body.name) pet.name = req.body.name;
          if(req.body.animal) pet.animal = req.body.animal;
          if(req.body.breed) pet.breed = req.body.breed; 
          if(req.body.size) pet.size = req.body.size;
          if(req.body.sex) pet.sex = req.body.sex;
          if(req.body.age) pet.age = req.body.age;
          shelter.save(function(err, shelter) {
            if (err) res.json({message: `Shelter could not be updated because ${err}`});
            else {
              res.json(shelter);
            };
          });
        };
      });
    };
  });
};

module.exports = {
  index: index,
  show: show,
  create: create,
  update: update,
  newpet: newpet,
  delete: destroy,
  showpets: showpets,
  deletepet: deletepet,
  editpet: editpet,
  showpet: showpet
}