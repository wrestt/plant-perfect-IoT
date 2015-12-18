var Bookshelf = require('./../config/bookshelf').bookshelf;
require('./Pi');

var Schedule = Bookshelf.Model.extend({
  tableName: 'schedule',
  hasTimestamps: true,
  pi: function() {
    return this.belongsTo('Pi');
  }
});

module.exports = Bookshelf.model('Schedule', Schedule);
