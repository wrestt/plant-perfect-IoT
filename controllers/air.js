var Air = require('./../models/Air');

app.get('/airs/:id', function(req, res) {
  var piId = req.params.id;
  Air.forge({id: req.params.id})
  .fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/airs', function(req, res) {
  Air.forge()
  .fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
