var bookshelf = require('./../config/bookshelf').bookshelf;

var Soil = bookshelf.Model.extend({
  tableName: 'soil',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = {
  Soil: Soil
};
