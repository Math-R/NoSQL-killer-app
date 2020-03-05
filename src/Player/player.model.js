module.exports = {
  mapToPlayer(playerFromDB) {
    return {
      id: playerFromDB.id.toJSON(),
      name: playerFromDB.name,
      level: playerFromDB.level,
      allegiance: playerFromDB.allegiance
    }
  }
};
