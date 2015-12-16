var knex = require('knex')(require('../knexfile')['production']);
var bookshelf = require('bookshelf')(knex);

module.exports.bookshelf = bookshelf;
