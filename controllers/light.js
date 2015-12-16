var Model = require('./../models/Light');

var getLight = function(req, res) {
  var piId = req.params.id;
  new Model.Light().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
};

var getAllLights = function(req, res) {
  new Model.Light().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};

module.exports = {
  getLight: getLight,
  getAllLights: getAllLights
};
