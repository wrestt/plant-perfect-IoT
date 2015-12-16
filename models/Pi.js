var bookshelf = require('./../config/db').bookshelf;

var Pi = bookshelf.Model.extend({
  tableName: 'pi'
});

module.exports = {
  Pi: Pi
};
