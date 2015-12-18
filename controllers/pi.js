var Pi = require('./../models/Pi');
var crontab = require('./../node_modules/node-crontab');
var crontab = require('node-crontab');
var jobId = crontab.scheduleJob('* * * * *', function(a) {
  console.log('Hello ' + a + '! Its been a minute!');
}, ['World']);

app.get('/pis/:id', function(req, res) {
  Pi.forge({id: req.params.id})
  .fetchAll({withRelated: ['Light', 'Soil', 'Water', 'Air']})
  .then(function(Pi) {
    if (!Pi) {
      res.status(404).json({error: true, data: {}});
    } else {
      res.json({error: false, data: Pi.toJSON()});
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
