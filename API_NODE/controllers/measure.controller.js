/**
 * defines methods to interact with Measure documents
 * @module MeasureController
 */

const Measure = require('../models/measure.model')
const Module = require('../models/module.model')
const MeasureErrors = require('../commons/measure.errors')
const ModuleErrors = require('../commons/module.errors')

const Config = require('../commons/config');

const validator = require('validator');

const {answer} = require('./ControllerAnswer')


/* ************************************************
   functions to test parameters taken from req.body
   WARNING: some tests (on string length, values, ...)
   are already done at the mongodb level
 *********************************************** */
function checkType(type) {
}

function checkDate(date) {
}

function checkValue(value) {
}

function checkModuleKey(key) {
}

function checkData(data) {
}


/**
 * create a measure
 */
const create = async function (req, res, next) {
};

/**
 * update a measure
 */
const update = async function (req, res, next) {
};

/**
 * get all measures from a module
 */
const getMeasures = async function (req, res, next) {
};


module.exports = {
  create,
  update,
  getMeasures,
}
