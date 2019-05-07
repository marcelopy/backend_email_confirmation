const express = require('express');
const usersEmailRoute = express.Router();
const {createUser, validateUserTimeStamp}= require('../helpers/usersEmailRouteHelpers');
const validateUserEmail = require('../helpers/validateUserCreate');

usersEmailRoute.post('/newuser',validateUserEmail, createUser);

usersEmailRoute.get('/:uniqueTimeStamp', validateUserTimeStamp);

module.exports = usersEmailRoute;
