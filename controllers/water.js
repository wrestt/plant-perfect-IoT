var Model = require('./../models/Water');

app.get('/waters/:id', function(req, res) {
  var piId = req.params.id;
  new Model.Water().where('idpi', piId).fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/waters', function(req, res) {
  new Model.Water().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
