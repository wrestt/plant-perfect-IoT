var knex = require('knex')(require('../knexfile')['production']);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');

module.exports.bookshelf = bookshelf;
