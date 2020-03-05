const { types } = require('cassandra-driver');
const { mapToPlayerDB } = require('./player.db.model');
const { CassandraClient } = require('../database/databaseConnector');

module.exports = {
  getAllPlayersDB() {
    const query = 'SELECT * FROM workshop.players';
    return CassandraClient.execute(query).then(resQuery => {
      return resQuery.rows.map((row) =>
        mapToPlayerDB(row['id'], row['name'], row['level'], row['killCount'])
      )
    });
  },

  getPlayerById(id) {
    const params = [types.Uuid.fromString(id)];
    const query = 'SELECT * FROM workshop.players WHERE id=?';
    return CassandraClient.execute(query, params).then(resQuery => {
      const row = resQuery.first();
      return mapToPlayerDB(row['id'], row['name'], row['level'], row['killCount']);
    });
  },

  insertPlayer(playerToAdd) {
    const query = 'INSERT INTO workshop.players(id,name,level,killCount) VALUES (?,?,?,?)';
    const newId = types.TimeUuid.now();
    const params = [newId, playerToAdd.name, playerToAdd.level, playerToAdd.killCount];
    return CassandraClient.execute(query, params).then(() => {
      return newId;
    });
  },

  updatePlayer(id, playerToUpdate) {
    const query = 'UPDATE workshop.players SET name=?, level=?, killCount=? WHERE id=?';
    const params = [playerToUpdate.name, playerToUpdate.level, playerToUpdate.killCount, types.Uuid.fromString(id)];
    return CassandraClient.execute(query, params).then(resQuery => !!resQuery);
  },

  deletePlayer(playerIdToDelete) {
    const query = 'DELETE FROM workshop.players WHERE id=?';
    return CassandraClient.execute(query, [playerIdToDelete]).then(resQuery => !!resQuery)
  }
};