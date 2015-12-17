var Bookshelf = require('./../config/bookshelf').bookshelf;

require('./Pi');

var Air = Bookshelf.Model.extend({
  tableName: 'air',
  hasTimestamps: true,
  pi: function() {
    return this.belongsTo('Pi');
  }
});

module.exports = Bookshelf.model('Air', Air);
