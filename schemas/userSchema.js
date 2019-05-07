const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  isConfirmed: {type:Boolean, default:false},
  userName:{type:String, required:true},
  email:{type:String, required:true},
  password:{type:String, required:true},
  timeStampIdentifier:{type:String, required:true}
}, {versionKey:false})

module.exports = userSchema;
