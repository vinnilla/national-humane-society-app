var mongoose = require('./database')
var user = require('../models/user')
var Shelter = require('../models/shelter')


var newShelters = [
{ // 0
  name: "LA Animal Rescue",
  address: "Chatsworth, CA 90025",
  city: "Chatsworth",
  state: "CA",
  zip: 90025,
  description: "",
  phone: 424-208-8840,
  email: "info@laar.org",
  pets: []
},
{ // 1
  name: "Paws Rescue",
  address: "Decatur, AL 35603 US ",
  city: "Decatur",
  state: "AL",
  zip: 35603,
  description: "We are a small rescue. Paws rescue often takes animals that would be put to sleep in shelters.",
  phone: 256-259-6511,
  email: "pawsrescue@gmx.com",
  pets: []
},
{ // 2
  name: "Humane Society of Marion County",
  address: "PO Box 1373 Yellville, AR 72687",
  city: "Yellville",
  state: "AR",
  zip: 72687,
  description: "",
  phone: 818-660-1684,
  email: "Humanesocietyyellville@yahoo.com",
  pets: []
},
{ // 3
  name: "Sunshine Rescue Group",
  address: "15555 E. 14th Street, San Leandro, 94578",
  city: "San Leandro",
  state:"CA",
  zip: "94578",
  description: "",
  phone: 510-483-4599,
  email: "sunshinerescuegroup@yahoo.com",
  pets: []
},
{ // 4
  name: "Redwood Coast Humane Society",
  address: "39151 S. Hwy 1",
  city: "Gualala",
  state: "CA",
  zip: 95445,
  description: "",
  phone:  707-884-1304,
  email: "",
  pets: []
},
{ // 5
  name: "Second Chance at Love Humane Society",
  address: "Templeton CA 93465",
  city: "Augusta",
  state: "GA",
  zip: "805-434-3982",
  description: "",
  phone: 706-790-6836,
  email: "smeeks@augustaga.gov",
  pets: []
}

];


var pets = [
{ //0
  name: "Dragon",
  animal: "Cat",
  breed: "Siamese",
  size: "medium",
  gender: "female",
  age: "Young",

},
{ //1
  name: "Lopsy",
  animal: "Rabbit",
  breed: "Mini-Lop & Bunny Rabbit Mix",
  size: "small",
  gender: "female",
  age: "Young"
},
{ //2
  name: "Bleep & Beep",
  animal: "Hamster",
  breed: "Hamster",
  size: "small",
  gender: "female",
  age: "Young"
},
{ //3
  name: "Thunder",
  animal: "Dog",
  breed: "Siberian Husky",
  size: "Large",
  gender: "Male",
  age: "Adult"
},
{ //4
  name: "Hammy",
  animal: "Pig",
  breed: "Pot Bellied",
  size: "medium",
  gender: "Male",
  age: "Young"
},
{ //5
  name: "Salsa",
  animal: "Dog",
  breed: "Terrier & Chihuahua Mix",
  size: "Small",
  gender: "Female",
  age: "Baby"
},
{ //6
  name: "Indigo",
  animal: "Dog",
  breed: "Pit Bull Terrier",
  size: "Medium",
  gender: "Male",
  aggendere: "Young"
},
{ //7
  name: "Mookie",
  animal: "Rabbit",
  breed: "Netherland Dwarf",
  size: "Small",
  gender: "Female",
  age: "Adult"
},
{ //8
  name: "Ravi",
  animal: "Bird",
  breed: "Conure",
  size: "Medium",
  gender: "Unknown",
  age: "Young"
},
{ //9
  name: "Shawn",
  animal: "Goat",
  breed: "Goat Mix",
  size: "Large",
  gender: "Male",
  age: "Adult"
}
];

Shelter.remove({}, function (err) {
  if (err) console.log(err);
  Shelter.create(Shelters, function (err, shelters)
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + shelter.length + " Shelters.")
      mongoose.disconnect();
    }
  });
});


}


module.exports = Shelter;




