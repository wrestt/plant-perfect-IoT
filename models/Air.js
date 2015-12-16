var bookshelf = require('./../config/bookshelf').bookshelf;

var Air = bookshelf.Model.extend({
  tableName: 'air',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = {
  Air: Air
};
