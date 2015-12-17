var Pi = require('./../models/Pi');

app.get('/pis/:id', function(req, res) {
  Pi.forge({id: req.params.id})
  .fetchAll({withRelated: ['Light', 'Soil', 'Water', 'Air']})
  .then(function(pi) {
    if (!pi) {
      res.status(404).json({error: true, data: {}});
    } else {
      res.json({error: false, data: pi.toJSON()});
    }
  }).catch(function(err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

app.get('/pis', function(req, res) {
  Pi.forge()
  .fetchAll()
  .then(function(pis) {
    res.json({error: false, data: pis.toJSON()});
  })
  .catch(function(err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});
