const {
  getAllPlayersDB,
  insertPlayer,
  updatePlayer,
  deletePlayer,
  getPlayerById
} = require('./player.da');
const { mapToPlayerDB, uuidFromString } = require('./player.db.model');
const { mapToPlayer } = require('./player.model');


module.exports = {
  getAllPlayers() {
    return getAllPlayersDB()
      .then(playersDB => playersDB.map(mapToPlayer));
  },

  addPlayer(playerToAdd) {
    const playerToAddDB = mapToPlayerDB(null, playerToAdd.name, playerToAdd.level, playerToAdd.killCount);
    return insertPlayer(playerToAddDB);
  },

  async getPlayer(id) {
    const dbPlayer = await getPlayerById(id);
    return mapToPlayer(dbPlayer);
  },

  modifyPlayer(playerToUpdate) {
    const playerToAddDB = mapToPlayerDB(null, playerToUpdate.name, playerToUpdate.level, playerToUpdate.killCount);
    return updatePlayer(playerToUpdate.id, playerToAddDB);
  },

  removePlayer(playerIdToDelete) {
    return deletePlayer(uuidFromString(playerIdToDelete))
  }
};