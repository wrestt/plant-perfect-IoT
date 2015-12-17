var Bookshelf = require('./../config/bookshelf').bookshelf;
Bookshelf.plugin('registry');

var Pi = Bookshelf.Model.extend({
  tableName: 'pi',

  Air: function() {
    return this.hasMany('Air');
  },

  Soil: function() {
    return this.hasMany('Soil');
  },

  Water: function() {
    return this.hasMany('Water');
  },

  Light: function() {
    return this.hasMany('Light');
  }

});

module.exports = Bookshelf.model('Pi', Pi);
