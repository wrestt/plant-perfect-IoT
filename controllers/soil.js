var Model = require('./../models/Soil');

app.get('/soils/:id', function(req, res) {
  var piId = req.params.id;
  new Model.Soil().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/soils', function(req, res) {
  new Model.Soil().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
