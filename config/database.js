var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

// database connection event
mongoose.connection.once('open', function (cb) {
  console.log(`Mongoose connected to: ${process.env.DATABASE_URL}`);
});

module.exports = mongoose;
