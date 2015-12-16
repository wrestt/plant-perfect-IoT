var Model = require('./../models/Air');

app.get('/airs/:id', function(req, res) {
  var piId = req.params.id;
  new Model.Air().where('idpi', piId).fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/airs', function(req, res) {
  new Model.Air().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
