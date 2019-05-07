const mongoose = require('mongoose');
const databaseUrl = 'mongodb://localhost:27017/emailValidator';

const connectToMongo = async ()=>{
  try{
    await mongoose.connect(databaseUrl, {useNewUrlParser:true})
  }
  catch (error){
    console.log(error);
  }
}

module.exports = connectToMongo;
