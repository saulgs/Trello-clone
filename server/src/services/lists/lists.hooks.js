const { authenticate } = require('@feathersjs/authentication').hooks;
const { isBoardMember } = require('../../hooks/authorization');

module.exports = {
  before: {
    all: [ authenticate('jwt'), isBoardMember ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
