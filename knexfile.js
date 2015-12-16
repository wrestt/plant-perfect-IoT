var config = require('./env.json')[process.env.NODE_ENV || 'production'];
var dbUsername = config.PLANTDATA_USERNAME;
var dbPassword = config.PLANTDATA_PASSWORD;
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'plantdata',
      user:     dbUsername,
      password: dbPassword
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'plantdata',
      user:     dbUsername,
      password: dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'plantdata',
      user:     dbUsername,
      password: dbPassword
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
