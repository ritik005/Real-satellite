var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
// create Schema
const InvestorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    companyName: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

mongoose.model('investor', InvestorSchema);