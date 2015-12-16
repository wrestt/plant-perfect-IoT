var knex = require('knex')(require('./../config/db')[app.get('env')]);
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
