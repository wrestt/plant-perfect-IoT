var bookshelf = require('./../config/bookshelf').bookshelf;

var Light = bookshelf.Model.extend({
  tableName: 'light',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = {
  Light: Light
};
