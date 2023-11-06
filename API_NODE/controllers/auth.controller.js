/**
 * defines methods to manage jwt and authentication processes
 * @module AuthController
 */
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')

const Config = require("../commons/config");
const validator = require('validator');

const User = require('../models/user.model');

const UserErrors = require('../commons/user.errors');
const AuthErrors = require('../commons/auth.errors');

const Helpers = require('./helpers.controller');
const {answer} = require('./ControllerAnswer')

/**
 * check correctness of name parameter (from req.body.name)
 * @param {String} name - the parameter to test
 * @returns {boolean} - false if name is not defined
 */
function checkLogin(name) {
  if ((name === undefined) || (!validator.isAlphanumeric(name,'fr-FR'))) {
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_LOGIN_NOT_DEFINED))
    return false;
  }
  return true;
}

/**
 * check correctness of lastName parameter (from req.body.lastName)
 * @param {String} password - the parameter to test
 * @returns {boolean} - false if password is not defined
 */
function checkPassword(password) {
  if (password === undefined) {
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_PASSWORD_NOT_DEFINED))
    return false;
  }
  return true;
}

/**
 * check user credentials
 * @param {Object} req - The request object (provided by express)
 * @param {Object} req.body - The data payload sent with the request
 * @param {string} req.body.login - The login of the user to sign in
 * @param {string} req.body.password - The password of the user to sign in
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 * @alias module:AuthController.signIn
 */
const signIn = async function (req, res, next) {
  answer.reset()

  console.log('sign in');

  // sanity check on parameters
  if ((!checkLogin(req.body.login)) ||
      (!checkPassword(req.body.password))) {
    return next(answer);
  }
  // check if name exists
  let user = null;
  try {
    user = await User.findOne({login:req.body.login}).exec();
    if (user === null) {
      answer.set(UserErrors.getError(UserErrors.ERR_USER_CANNOT_FIND_LOGIN))
      return next(answer);
    }
  }
  catch(err) {
    answer.set(UserErrors.getError(UserErrors.ERR_USER_INVALID_FIND_LOGIN_REQUEST))
    return next(answer);
  }
  let passValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passValid) {
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_PASSWORD_NO_MATCH))
    return next(answer);
  }
  
  let sessionId = uuidv4();
  user.sessionId = sessionId
  try {
    user = await user.save()
  }
  catch(err) {
    answer.set(UserErrors.getError(UserErrors.ERR_USER_CANNOT_UPDATE))
    return next(answer)
  }
  
  let jwttoken = jwt.sign({rights: user.rights, token: sessionId}, 'secretkey'); //JWT TOKEN
  answer.setPayload({
    token: jwttoken,
  })

  res.status(200).send(answer);
};

const verifyToken = async function (req, res, next) {

  answer.reset();

  // Extract the JWT token from the request headers
  const token = req.headers['authorization']; // Assuming the token is in the 'Authorization' header

  if (!token) {
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_NO_TOKEN));
    return next(answer);
  }

  try {
    // Verify and decode the JWT token using the secret key
    const decoded = jwt.verify(token, secretKey);

    // Find the user associated with the session ID from the decoded token
    const user = await User.findOne({ sessionId: decoded.token }).exec();

    if (!user) {
      answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_NOT_AUTHORIZED));
      return next(answer);
    }

    // Attach the user to the request for further use
    req.user = user;

    // Continue to the next middleware or route
    return next();
  } catch (err) {
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_NOT_AUTHORIZED));
    return next(answer);
  }
};

/**
 * checks if the current user (get from a valid token) is admin
 * @param {Object} req - The request object (provided by express)
 * @param {String} req.user - The user object (filled by verifyToken)
 * @param {Object} res - The result object used to send the result to the client (provided by express)
 * @param {Function} next - The next middleware to call after this one
 */
const onlyAdmin = async function(req, res, next) {
  answer.reset()
  if (!req.user) {
    console.log("onlyAdmin(): no user found in req");
    answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_NOT_AUTHORIZED))
    return next(answer);
  }
  for(let i=0;i<req.user.rights.length;i++) {
    let r = req.user.rights[i];
    if (r.startsWith("admin")) {
      return next();
    }
  }
  answer.set(AuthErrors.getError(AuthErrors.ERR_AUTH_INVALID_RIGHT))
  return next(answer);
};


module.exports = {
  verifyToken,
  onlyAdmin,
  signIn,
};
