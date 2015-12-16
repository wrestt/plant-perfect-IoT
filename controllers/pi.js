var Model = require('./../models/Pi');

var getPi = function(req, res) {
  var piId = req.params.id;
  new Model.Pi().where('idpi', piId).fetch()
  .fetch({withRelated: ['light', 'soil', 'water', 'air']})
  .then(function(pi) {
    if (!pi) {
      res.status(404).json({error: true, data: {}});
    } else {
      res.json({error: false, data: pi.toJSON()});
    }
  }).catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
};

var getAllPis = function(req, res) {
  new Model.Pi().fetchAll()
  .then(function(pis) {
    res.json({error: false, data: pis.toJSON()});
  })
  .catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
};

module.exports = {
  getPi: getPi,
  getAllPis: getAllPis
};
