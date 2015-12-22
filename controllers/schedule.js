var Schedule = require('./../models/Schedule');
var spawn = require('child_process').spawn;
// var high = spawn('python', ['./../pumpStart.py']);
// var low = spawn('python', ['./../pumpStop.py']);
var scheduleInfo;

function start(pi) {
  high.stdout.on('data', function(data) {
    timer(pi);
    console.log('stdout: ' + data);
  });

  high.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
};

function stop(pi) {
  low.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  low.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
};


function timer() {
  Schedule.forge({id: 1})
  .fetch()
    .then(function(pi) {
      if (pi.attributes.auto === true) {
        console.log('Set to auto');
      } else {
        console.log('Set to schedule');
      }
    }).catch(function(error) {
      console.log(error);
    });
};

timer();

app.get('/schedules/:id', function(req, res) {
  Schedule.forge({id: req.params.id})
  .fetch()
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
