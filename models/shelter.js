var mongoose = require('mongoose');


var petSchema = new mongoose.Schema ({
  name: String,
  animal: String,
  breed: String,
  size: Number,
  sex: String,
  age: Number
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
