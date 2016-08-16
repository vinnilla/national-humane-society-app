var mongoose = require('mongoose');


var petSchema = new mongoose.Schema ({
  name: String,
  animal: String,
  breed: String,
  size: String,
  sex: String,
  age: Number
})

var shelterSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  pets: [petSchema],
  description: String,
  phone: String,
  email: String,
  userId: String
});


var Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
