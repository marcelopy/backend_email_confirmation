const mongoose = require('mongoose');
const userSchema = require ('../schemas/userSchema');

const userModel = mongoose.model('emailusers', userSchema);

module.exports = userModel;
