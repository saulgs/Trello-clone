const mongoose = require('mongoose');

//Función para verificar si es dueño o miembro del board
async function isBoardMember(context){
  let { boardId } = context.params.query || context.data ;

  if(!boardId){
      return context;
  }

  const { _id } = context.params.user;

  const boards = mongoose.model('boards');
  const board = await boards.findById(boardId).lean();

  //Asignar todos los datos obtenidos a "data"
  var data = {};
  data = Object.assign({}, { bId: boardId }, { userId: _id }, { cboard: board });

  //Conversión "dumb" para tener los objetos al mismo tipo
  data = JSON.stringify(data);
  const cdata = JSON.parse(data);
  
 //console.log('Es propietario:', cdata.userId === cdata.cboard.ownerId ? 'SI':'NO');
 //console.log('Es miembro:', cdata.cboard.memberIds.indexOf(cdata.userId) > -1 ? 'SI |':'NO |', 
 //            'Posicion:', cdata.cboard.memberIds.indexOf(cdata.userId) === -1 ? 'No existe('+cdata.cboard.memberIds.indexOf(cdata.userId)+')' : cdata.cboard.memberIds.indexOf(cdata.userId));
    
  if(cdata.cboard){
    if(cdata.userId === cdata.cboard.ownerId || cdata.cboard.memberIds.indexOf(cdata.userId) > -1){
      return context;
    }else{
      return Promise.reject(new Error('Unathorized access'));
    }
  }

  return context;
}

async function isOwnerOrMember(context){
    const { _id } = context.params.user;

    const boards = mongoose.model('boards');
    let allBoards = await boards.find({}, 'ownerId memberIds').lean();
    let coincidenceBoards = await boards.find({
        $or: [{ownerId: _id}, {memberIds: _id}]
    }).lean();

    //Dumb convertion
    if(coincidenceBoards){
        coincidenceBoards = JSON.stringify(coincidenceBoards);
        coincidenceBoards = JSON.parse(coincidenceBoards);
    }else{
        return context;
    }
    if(allBoards){
        allBoards = JSON.stringify(allBoards);
        allBoards = JSON.parse(allBoards);
    }else{
        return context;
    }

    let q_idx = 0;
    allBoards.forEach((el, i) => {
        if(el.ownerId === _id.toString() || el.memberIds.indexOf(_id.toString()) > -1){
                q_idx++;
        }
    });
    
    //Debug section
    //console.log('Cantidad en coincidencia:', Object.keys(coincidenceBoards).length);
    //console.log('Cantidad total:', Object.keys(allBoards).length);
    //console.log('Encontrados:', q_idx);
    //console.log('Coincide', Object.keys(coincidenceBoards).length === q_idx ? 'SI' : 'NO');
    
    return Object.keys(coincidenceBoards).length === q_idx ? context : Promise.reject(new Error('Inconsistent data'));
}

module.exports = {
    isBoardMember,
    isOwnerOrMember
}