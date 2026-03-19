const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name : String,
    usn : { type : String, unique : true},
    email : String,
    phone : String, 
    department : String, 
    cgpa : String,
    skills : [String],
    gender : String, 
    status : String,
    gender : String, 
    Company : String,
    placementDate : Date
});

module.exports = mongoose.model('Student', studentSchema);