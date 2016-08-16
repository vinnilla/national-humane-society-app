var mongoose = require('mongoose');


var petSchema = new mongoose.Schema ({
  name: String,
  animal: String,
  breed: String,
  size: String,
  sex: String,
  age: String,
})

var shelterSchema = new mongoose.Schema({
  name: String,
  location: String,
  pets: [petSchema],
  description: String,
  contact_info: String
});


var Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
