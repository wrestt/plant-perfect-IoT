var bookshelf = require('./../config/db').bookshelf;

var Pi = bookshelf.Model.extend({
  tableName: 'pi',

  airs: function() {
    return this.hasMany(Air, 'idpi');
  },

  soils: function() {
    return this.hasMany(Soil, 'idpi');
  },

  waters: function() {
    return this.hasMany(Water, 'idpi');
  },

  lights: function() {
    return this.hasMany(Light, 'idpi');
  }

});

module.exports = {
  Pi: Pi
};
