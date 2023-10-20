/**
 * defines methods to interact with Measure documents
 * @module MeasureController
 */

const Module = require('../models/module.model')
const ModuleErrors = require('../commons/module.errors')
const Chipset = require('../models/chipset.model')
const { v4: uuidv4 } = require('uuid');

const Config = require('../commons/config');

const validator = require('validator');

const {answer} = require('./ControllerAnswer')


/* ************************************************
   functions to test parameters taken from req.body
   WARNING: some tests (on string length, values, ...)
   are already done at the mongodb level
 *********************************************** */
function checkName(type) {
}

function checkUC(uc) {
}

function checkChipsets(chipsets) {
}

function checkKey(key) {
}

function checkData(data) {
}

/**
 * register a module because of it asks for => its name/shortname/key are generated
 */
const register = async function (req, res, next) {
};

/**
 * create a module from scratch with all infos
 */
const create = async function (req, res, next) {
};

/**
 * update a module
 */
const update = async function (req, res, next) {
};

/**
 * get all modules
 */
const getModules = async function (req, res, next) {
};


module.exports = {
  create,
  update,
  register,
  getModules,
}
