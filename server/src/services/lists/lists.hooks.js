const { authenticate } = require('@feathersjs/authentication').hooks;
const mongoose = require('mongoose');

//Función para verificar si es dueño o miembro del board
async function isBoardMember(context){
  const { boardId } = context.params.query;
  const { _id } = context.params.user;

  const boards = mongoose.model('boards');
  const board = await boards.findById(boardId).lean();

  //Asignar todos los datos obtenidos a "data"
  var data = {};
  data = Object.assign({}, { bId: boardId }, { userId: _id }, { cboard: board });

  //Conversión "dumb" para tener los objetos al mismo tipo
  data = JSON.stringify(data);
  const cdata = JSON.parse(data);
  
  console.log('Es propietario:', cdata.userId === cdata.cboard.ownerId ? 'SI':'NO');
  console.log('Es miembro:', cdata.cboard.memberIds.indexOf(cdata.userId) > -1 ? 'SI |':'NO |', 
              'Posicion:', cdata.cboard.memberIds.indexOf(cdata.userId) === -1 ? 'No existe('+cdata.cboard.memberIds.indexOf(cdata.userId)+')' : cdata.cboard.memberIds.indexOf(cdata.userId));
    
  if(cdata.cboard){
    if(cdata.userId === cdata.cboard.ownerId || cdata.cboard.memberIds.indexOf(cdata.userId) > -1){
      return context;
    }else{
      return Promise.reject(new Error('Unathorized access'));
    }
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ isBoardMember ],
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
