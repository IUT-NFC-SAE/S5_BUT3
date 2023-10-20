/**
 * defines methods to manage jwt and authentication processes
 * @module AuthController
 */
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const Config = require("../commons/config");
const validator = require('validator');

const User = require('../models/user.model');


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
 */
const signIn = async function (req, res, next) {
};

const verifyToken = async function (req, res, next) {
}


module.exports = {
  verifyToken,
  signIn,
};
