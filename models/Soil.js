var Bookshelf = require('./../config/bookshelf').bookshelf;
Bookshelf.plugin('registry');

var Soil = Bookshelf.Model.extend({
  tableName: 'soil',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = Bookshelf.model('Soil', Soil);
