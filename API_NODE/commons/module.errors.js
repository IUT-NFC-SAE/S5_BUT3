const Config = require('./config');

const ERR_MODULE_NAME_NOT_DEFINED = 500; //
const ERR_MODULE_KEY_NOT_DEFINED = 501;
const ERR_MODULE_UC_NOT_DEFINED = 502;
const ERR_MODULE_CHIPSETS_NOT_DEFINED = 503;

const ERR_MODULE_INVALID_MODULE_KEY = 510;
const ERR_MODULE_INVALID_FIND_MODULE_REQUEST = 511;
const ERR_MODULE_KEY_ALREADY_EXISTS = 512;
const ERR_MODULE_NAME_ALREADY_EXISTS = 513;
const ERR_MODULE_SHORTNAME_ALREADY_EXISTS = 514;

const ERR_MODULE_INVALID_CREATE_REQUEST = 520;
const ERR_MODULE_CANNOT_CREATE = 521;

const ERR_MODULE_CANNOT_FIND_ID = 530;
const ERR_MODULE_INVALID_FIND_ID_REQUEST = 531;

const ERR_MODULE_CANNOT_UPDATE = 540;

const ERR_MODULE_INVALID_FIND_REQUEST = 550;

const measureErrors = [
  { number: ERR_MODULE_NAME_NOT_DEFINED, status: 400, message: { fr: 'aucun champ name n\'est fourni' }},
  { number: ERR_MODULE_KEY_NOT_DEFINED, status: 400, message: { fr: 'aucun champ key n\'est fourni' }},
  { number: ERR_MODULE_UC_NOT_DEFINED, status: 400, message: { fr: 'aucun champ µC n\'est fourni' }},
  { number: ERR_MODULE_CHIPSETS_NOT_DEFINED, status: 400, message: { fr: 'aucun champ chipsets n\'est fourni' }},
  { number: ERR_MODULE_INVALID_MODULE_KEY, status: 400, message: { fr: 'clé de module invalide' }},
  { number: ERR_MODULE_INVALID_FIND_MODULE_REQUEST, status: 400, message: { fr: 'impossible de trouver un module à partir de son nom/surnom/clé' }},
  { number: ERR_MODULE_NAME_ALREADY_EXISTS, status: 400, message: { fr: 'le nom du module existe déjà' }},
  { number: ERR_MODULE_SHORTNAME_ALREADY_EXISTS, status: 400, message: { fr: 'le surnom du module existe déjà' }},
  { number: ERR_MODULE_KEY_ALREADY_EXISTS, status: 400, message: { fr: 'la clé du module existe déjà' }},
  { number: ERR_MODULE_INVALID_CREATE_REQUEST, status: 400, message: { fr: 'requête de création de module invalide' }},
  { number: ERR_MODULE_CANNOT_CREATE, status: 400, message: { fr: 'impossible de créer un module' }},
  { number: ERR_MODULE_CANNOT_FIND_ID, status: 400, message: { fr: 'impossible de trouver un moduile par son id' }},
  { number: ERR_MODULE_INVALID_FIND_ID_REQUEST, status: 400, message: { fr: 'requête de recherche de module par id invalide' }},
  { number: ERR_MODULE_CANNOT_UPDATE, status: 400, message: { fr: 'impossible de mettre à jour un module' }},

  { number: ERR_MODULE_INVALID_FIND_REQUEST, status: 400, message: { fr: 'requête invalide pour trouver tous les modules' }},

];

const getError = (number, lang) => {
  if (lang === undefined) lang = Config.defaultLang;
  let err = measureErrors.find(e => e.number === number);
  if (err !== undefined) {
    if (lang === 'fr') {
      return {
        error: err.number,
        status: err.status,
        data: err.message.fr
      };
    }
  }
  return {
    error: 1,
    status: 500,
    data: 'undetermined error'
  }
};

module.exports = {
  ERR_MODULE_NAME_NOT_DEFINED,
  ERR_MODULE_KEY_NOT_DEFINED,
  ERR_MODULE_UC_NOT_DEFINED,
  ERR_MODULE_CHIPSETS_NOT_DEFINED,
  ERR_MODULE_KEY_ALREADY_EXISTS,
  ERR_MODULE_NAME_ALREADY_EXISTS,
  ERR_MODULE_SHORTNAME_ALREADY_EXISTS,
  ERR_MODULE_INVALID_MODULE_KEY,
  ERR_MODULE_INVALID_FIND_MODULE_REQUEST,
  ERR_MODULE_INVALID_CREATE_REQUEST,
  ERR_MODULE_CANNOT_CREATE,
  ERR_MODULE_CANNOT_UPDATE,
  ERR_MODULE_INVALID_FIND_ID_REQUEST,
  ERR_MODULE_INVALID_FIND_REQUEST,
  ERR_MODULE_CANNOT_FIND_ID,
  getError
};


