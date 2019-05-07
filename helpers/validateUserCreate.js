const {check} = require('express-validator/check');

const validateUserEmail = [
  check('email').trim().isEmail().withMessage('The email is invalid'),
]

module.exports = validateUserEmail;
