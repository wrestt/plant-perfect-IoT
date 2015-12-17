var Bookshelf = require('./../config/bookshelf').bookshelf;
Bookshelf.plugin('registry');

var Light = Bookshelf.Model.extend({
  tableName: 'light',

  hasTimestamps: true,

  idpi: function() {
    return this.belongsTo(Pi);
  }
});

module.exports = Bookshelf.model('Light', Light);
