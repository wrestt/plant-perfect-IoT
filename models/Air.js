var Bookshelf = require('./../config/bookshelf').bookshelf;
Bookshelf.plugin('registry');

var Air = Bookshelf.Model.extend({
  tableName: 'air',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = Bookshelf.model('Air', Air);
