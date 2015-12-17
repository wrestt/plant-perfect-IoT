var Bookshelf = require('./../config/bookshelf').bookshelf;
require('./Pi');

var Water = Bookshelf.Model.extend({
  tableName: 'water',
  hasTimestamps: true,
  pi: function() {
    return this.belongsTo('Pi');
  }
});

module.exports = Bookshelf.model('Water', Water);
