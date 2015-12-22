var Schedule = require('./../models/Schedule');
var spawn = require('child_process').spawn;
var high = spawn('python', ['./../pumpStart.py']);
var low = spawn('python', ['./../pumpStop.py']);

function start() {
  high.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  high.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
};

function stop() {
  low.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  low.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
};

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
