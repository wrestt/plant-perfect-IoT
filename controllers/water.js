var Model = require('./../models/Water');

var getWater = function(req, res) {
  var piId = req.params.id;
  new Model.Water().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
};

var getAllWaters = function(req, res) {
  new Model.Water().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports = {
  getWater: getWater,
  getAllWaters: getAllWaters
};
