var bookshelf = require('./../config/db').bookshelf;

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
