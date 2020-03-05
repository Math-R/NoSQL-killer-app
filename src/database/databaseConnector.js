const cassandra = require('cassandra-driver');

const localDataCenter = 'datacenter1';

exports.CassandraClient = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042', '127.0.0.1:9142'],
  keyspace: 'workshop',
  policies: {
    loadBalancing: new cassandra.policies.loadBalancing.DCAwareRoundRobinPolicy(localDataCenter, 1)
  }
});

