var config = require('./../env.json')[process.env.NODE_ENV || 'production'];
var dbUsername = config.PLANTDATA_USERNAME;
var dbPassword = config.PLANTDATA_PASSWORD;
var knex = require('knex')({
  client: 'pg',
  connection: 'postgres://' + dbUsername + ':' + dbPassword + '@localhost:5432/plantdata',
  searchPath: 'knex,public'
});
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
