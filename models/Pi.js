var Bookshelf = require('./../config/bookshelf').bookshelf;
require('./Air');
require('./Soil');
require('./Water');
require('./Light');
require('./Schedule');

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
  },
  Schedule: function() {
    return this.hasOne('Schedule');
  }

});

module.exports = Bookshelf.model('Pi', Pi);
