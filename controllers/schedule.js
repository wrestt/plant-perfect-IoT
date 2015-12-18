var Schedule = require('./../models/Schedule');

app.get('/schedules/:id', function(req, res) {
  Schedule.forge({id: req.params.id})
  .fetchAll()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/schedules', function(req, res) {
  Schedule.forge()
  .fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});
