var bookshelf = require('./../config/bookshelf').bookshelf;

var Water = bookshelf.Model.extend({
  tableName: 'water',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = {
  Water: Water
};
