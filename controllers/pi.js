var Model = require('./../models/Pi');

var getPi = function(req, res) {
  var piId = req.params.id;
  new Model.Pi().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
};

var getAllPis = function(req, res) {
  new Model.Pi().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports = {
  getPi: getPi,
  getAllPis: getAllPis
};
