const mongoose = require("mongoose");

// map global promise
mongoose.Promise = global.Promise;
//connect to mongoose
mongoose.connect('mongodb://localhost/realsatellite', {

})
.then(() => console.log('MongoDB connected..'))
.catch(err => console.log(err));
