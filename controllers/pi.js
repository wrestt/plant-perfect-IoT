var Pi = require('./../models/Pi');

app.get('/pis/:id', function(req, res) {
  Pi.forge({ id: req.params.id })
  .fetch({ withRelated: ['Light', 'Soil', 'Water', 'Air', 'Schedule'] })
  .then(function(Pi) {
    if (!Pi) {
      res.status(404)
      .json({
        error: true,
        data: { message: 'no plant found' },
      });
    } else {
      res.status(200).
      json({
        error: false,
        data: Pi.toJSON(),
      });
    }
  }).catch(function(err) {
      res.status(500)
      .json({
        error: true,
        data: { message: err.message },
      });
    });
});

app.get('/pis', function(req, res) {
  Pi.forge()
  .fetchAll()
  .then(function(pis) {
    res.status(200)
    .json({
      error: false,
      data: pis.toJSON(),
    });
  })
  .catch(function(err) {
    res.status(500)
    .json({
      error: true,
      data: { message: err.message },
    });
  });
});
