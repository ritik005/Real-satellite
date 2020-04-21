const mongoose = require("mongoose");

const db = require('./database1');
console.log(db.mongoURI);
// map global promise
mongoose.Promise = global.Promise;

const connectionString = db.mongoURI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(function() {
    console.log("MongoDB Connected");
  })
  .catch(function(err) {
    console.log(err);
  });