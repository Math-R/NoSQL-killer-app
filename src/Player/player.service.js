const {
  getAllPlayersDB, 
  insertPlayer, 
  updatePlayer, 
  deletePlayer, 
  getPlayerById
} = require('./player.da');
const {mapToPlayerDB} = require('./player.db.model');
const {mapToPlayer} = require('./player.model');


module.exports = {
  getAllPlayers() {
    return getAllPlayersDB()
      .then(playersDB => playersDB.map(mapToPlayer));
  },

  addPlayer(playerToAdd) {
    const playerToAddDB = mapToPlayerDB(null, playerToAdd.name, playerToAdd.house, playerToAdd.allegiance);
    return insertPlayer(playerToAddDB);
  },

  getPlayer(id) {
    return getPlayerById(id).then((player) => mapToPlayer(player));
  },

  modifyPlayer(playerToUpdate) {
    const playerToAddDB = mapToPlayerDB(null, playerToUpdate.name, playerToUpdate.house, playerToUpdate.allegiance);
    return updatePlayer(playerToUpdate.id, playerToAddDB);
  },

  removePlayer(playerIdToDelete) {
    return deletePlayer(uuidFromString(playerIdToDelete))
  }
};