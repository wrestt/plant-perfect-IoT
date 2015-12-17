var Bookshelf = require('./../config/bookshelf').bookshelf;
require('./Pi');

var Soil = Bookshelf.Model.extend({
  tableName: 'soil',
  hasTimestamps: true,
  pi: function() {
    return this.belongsTo('Pi');
  }
});

module.exports = Bookshelf.model('Soil', Soil);
