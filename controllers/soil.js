var Model = require('./../models/Soil');

var getSoil = function(req, res) {
  var piId = req.params.id;
  new Model.Soil().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
};

var getAllSoils = function(req, res) {
  new Model.Soil().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports = {
  getSoil: getSoil,
  getAllSoils: getAllSoils
};
