var Model = require('./../models/Air');

var getAir = function(req, res) {
  var piId = req.params.id;
  new Model.Air().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
};

var getAllAirs = function(req, res) {
  new Model.Air().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports = {
  getAir: getAir,
  getAllAirs: getAllAirs
};
