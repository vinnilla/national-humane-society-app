var mongoose = require('./database')
var Shelter = require('../models/shelter')

var pets = [
{ //0
  name: "Dragon",
  animal: "Cat",
  breed: "Siamese",
  size: "medium",
  sex: "female",
  age: "Young",

},
{ //1
  name: "Lopsy",
  animal: "Rabbit",
  breed: "Mini-Lop & Bunny Rabbit Mix",
  size: "small",
  sex: "female",
  age: "Young"
},
{ //2
  name: "Bleep & Beep",
  animal: "Hamster",
  breed: "Hamster",
  size: "small",
  sex: "female",
  age: "Young"
},
{ //3
  name: "Thunder",
  animal: "Dog",
  breed: "Siberian Husky",
  size: "Large",
  sex: "Male",
  age: "Adult"
},
{ //4
  name: "Hammy",
  animal: "Pig",
  breed: "Pot Bellied",
  size: "medium",
  sex: "Male",
  age: "Young"
},
{ //5
  name: "Salsa",
  animal: "Dog",
  breed: "Terrier & Chihuahua Mix",
  size: "Small",
  sex: "Female",
  age: "Baby"
},
{ //6
  name: "Indigo",
  animal: "Dog",
  breed: "Pit Bull Terrier",
  size: "Medium",
  sex: "Male",
  age: "Young"
},
{ //7
  name: "Mookie",
  animal: "Rabbit",
  breed: "Netherland Dwarf",
  size: "Small",
  sex: "Female",
  age: "Adult"
},
{ //8
  name: "Ravi",
  animal: "Bird",
  breed: "Conure",
  size: "Medium",
  sex: "Unknown",
  age: "Young"
},
{ //9
  name: "Shawn",
  animal: "Goat",
  breed: "Goat Mix",
  size: "Large",
  sex: "Male",
  age: "Adult"
}
];



var shelters = new mongoose.Schema[
{ // 0
  name: "LA Animal Rescue",
  location: "Chatsworth, CA 90025",
  pets: pets,
  description: "We are a 501c3 non-profit organization. Adoption process includes an adoption contract and home check. Adoption fee for dogs are $300 - 500 and for cats are $175. All of our animals are fixed, vaccinated, and chipped.",
  contact_info: "(424) 208-8840"
},
{ // 1
  name: "Rocky Mountain Animal Rescue",
  location: "Mission Hills, California 91345",
  pets: pets,
  description:"We are a 501c3 non-profit organization. Adoption process includes an adoption contract and home check. Adoption fee for dogs are $300 - 500 and for cats are $175. All of our animals are fixed, vaccinated, and chipped.",
  contact_info: "(818) 643-3989"
},
{ // 2
  name: "Animal Specialty Group Inc",
  location: "Los Angeles, CA 90030",
  pets: pets,
  description:"We are a 501c3 non-profit organization. Adoption process includes an adoption contract and home check. Adoption fee for dogs are $300 - 500 and for cats are $175. All of our animals are fixed, vaccinated, and chipped.",
  contact_info: "818-660-0684"
},
{ // 3
  name: "Animal Defenders International Inc",
  location: "Los Angeles, CA 90048",
  pets: pets,
  description:"We are a 501c3 non-profit organization. Adoption process includes an adoption contract and home check. Adoption fee for dogs are $300 - 500 and for cats are $175. All of our animals are fixed, vaccinated, and chipped.",
  contact_info: "323-935-2234"
},
{ // 4
  name: "Animal Adoption Solutions",
  location: "Santa Barbara, CA 93109",
  pets: pets,
  description:"We are a 501c3 non-profit organization. Adoption process includes an adoption contract and home check. Adoption fee for dogs are $300 - 500 and for cats are $175. All of our animals are fixed, vaccinated, and chipped.",
  contact_info: "805-259-7356"
},
{ // 5
  name: "Second Chance at Love Humane Society",
  location: "Templeton CA 93465",
  pets: pets,
  description:"Second Chance at Love Humane Society is a nonprofit, no kill organization comprised of volunteer professionals dedicated to the rescue, care and placement of homeless dogs in the North San Luis Obispo County area of California with responsible families who will provide loving care for the lifetime of the animal.",
  contact_info: "805-434-3982"
}

];

// create a function for location in 1 array.



module.exports = app;




