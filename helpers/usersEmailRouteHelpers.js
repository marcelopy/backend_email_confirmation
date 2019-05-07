const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const {validationResult} = require('express-validator/check');
const nodemailer=require('nodemailer');
const emailtransporter = nodemailer.createTransport({
  service:"Hotmail",
  auth:{
    user:process.env.USER_EMAIL,
    pass:process.env.PASSWORD_EMAIL}
  })
const saltRounds = parseInt(process.env.USER_SALT);



const createUser = async (req, res, next)=>{
  const errors = validationResult(req);
  try{
    if(errors.isEmpty()){
      const hashedPassword= await bcrypt.hash(req.body.password, saltRounds);
      const timeStamp = JSON.stringify(parseInt(Date.now()))+JSON.stringify(parseInt((Math.random() * 10000)));
      const userEmail = req.body.email;
      req.body.password= hashedPassword;
      req.body.timeStampIdentifier = timeStamp;
      userModel.create(req.body);
      const emailOptions={from:process.env.USER_EMAIL,
                          to:userEmail,
                          subject:'Please verify your email',
                          html: `<a href="http://localhost:4000/email/confirm/${timeStamp}">Confirm your account</a>`
                        };
      emailtransporter.sendMail(emailOptions,(err, info)=>{
        if(err){console.log(err)}else{console.log(info)}
      })
      res.status(200).json({message:'User created succesfully'});
    }else {
      return res.status(422).json({ errors: errors.array()[0].msg});
      }
  }
  catch (error){
    next(error);
  }
}

const validateUserTimeStamp = async (req, res, next)=>{
  try{
    const uniqueUrl = await userModel.findOneAndUpdate({timeStampIdentifier:req.params.uniqueTimeStamp}, {$set:{isConfirmed:'true'},$unset:{timeStampIdentifier:''}}, {new:true});
    if(uniqueUrl){
      res.status(200).send('Your email has been verified succesfully');
    }else{
      res.status(404).send('The credentials do not match');
    }
  }
  catch(error){
    next(error);
  }
}

module.exports= {createUser, validateUserTimeStamp}
