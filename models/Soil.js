var bookshelf = require('./../config/db').bookshelf;

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
