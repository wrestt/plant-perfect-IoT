var Bookshelf = require('./../config/bookshelf').bookshelf;
require('./Pi');

var Light = Bookshelf.Model.extend({
  tableName: 'light',
  hasTimestamps: true,
  pi: function() {
    return this.belongsTo('Pi');
  }
});

module.exports = Bookshelf.model('Light', Light);
