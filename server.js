const express = require('express');
const app= express();
const connectToMongo = require('./helpers/mongoHelpers');
const usersEmailRoute = require('./routes/emailRoute');


connectToMongo();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/emailValidation', usersEmailRoute);
app.use('/email/confirm', usersEmailRoute);

app.listen(4000);
console.log('Server is listening on 4000');
