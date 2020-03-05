const { types } = require('cassandra-driver');

module.exports = {
  mapToPlayerDB(id = null, name = null, level = null, killCount = null) {
    return {
      id: id,
      name: name,
      level: level,
      killCount: killCount
    }
  },
  uuidFromString(id) {
    return types.Uuid.fromString(id);
  }
};