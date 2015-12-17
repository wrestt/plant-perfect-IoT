var Bookshelf = require('./../config/bookshelf').bookshelf;
Bookshelf.plugin('registry');

var Water = Bookshelf.Model.extend({
  tableName: 'water',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = Bookshelf.model('Water', Water);
