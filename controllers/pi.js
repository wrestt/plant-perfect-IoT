var Model = require('./../models/Pi');

var getAllPis = function(req, res) {
  new Model.Pi().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
};
