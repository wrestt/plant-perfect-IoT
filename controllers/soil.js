var Soil = require('./../models/Soil');

app.get('/soils/:id', function(req, res) {
  Soil.forge({id: req.params.id})
  .fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/soils', function(req, res) {
  Soil.forge()
  .fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
