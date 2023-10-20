/**
 * defines common methods to interact with documents
 * @module HelpersController
 */

const User = require('../models/user.schema');
const {answer} = require('./ControllerAnswer')

/**
 * Select a User document given its id
 * @param idUser
 * @returns {Object}
 */
const findUser = async function(idUser) {
    let user = await User.findOne({_id:idUser}).exec();
};

module.exports = {
  findUser,
};



