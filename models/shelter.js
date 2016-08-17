var mongoose = require('mongoose');


var petSchema = new mongoose.Schema ({
  name: {type:String, default: 'Soba'},
  animal: String,
  breed: {type:String, default: ' '},
  size: String,
  sex: String,
  age: {type:Number, default: 0},
  image: String
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
