/**
 * defines methods to interact with User documents
 * @module UserController
 */

const User = require('../models/user.model');
const UserErrors = require('../commons/user.errors');
const Config = require('../commons/config');

const Helpers = require('./helpers.controller');
const validator = require('validator');

const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const {answer} = require('./ControllerAnswer')


/* ************************************************
   functions to test parameters taken from req.body
   WARNING: some tests (on string length, values, ...)
   are already done at the mongodb level
 *********************************************** */
/**
 * check correctness of firstName parameter (from req.body.name)
 */
function checkLogin(login) {
}

/**
 * check correctness of password (from req.body.password)
 */
function checkPassword(password) {
}

/**
 * check correctness of rights parameter (from req.body.rights) which must be an id
 */
function checkRights(rights) {
}

/**
 * check existence of token
 */
function checkCaptchaToken(token) {
}

/**
 * check correctness of email parameter (from req.body.email)
 */
function checkEmail(email) {
}

/**
 * check correctness of data parameter (from req.body.data)
 */
function checkData(data) {
}



/**
 * create a user (only possible for admin)
 * This function checks if there are already user's with the same name
 * If it's the case, it returns an error.
 */
const create = async function (req, res, next) {
};

/**
 * update a user
 */
const update = async function (req, res, next) {
};

/**
 * get all users
 */
const getUsers = async function (req, res, next) {
  console.log('get users');
  let users = null
  users = await User.find({},'_id login email rights').exec();
  answer.data = users;
  res.status(200).send(answer);
};


module.exports = {
  create,
  update,
  getUsers,
}
