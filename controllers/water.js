var Water = require('./../models/Water');

app.get('/waters/:id', function(req, res) {
  Water.forge({id: req.params.id})
  .fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/waters', function(req, res) {
  Water.forge()
  .fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
