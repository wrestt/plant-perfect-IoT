var Model = require('./../models/Light');

app.get('/lights/:id', function(req, res) {
  var piId = req.params.id;
  new Model.Light().where('idpi', piId).fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/lights', function(req, res) {
  new Model.Light().fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
