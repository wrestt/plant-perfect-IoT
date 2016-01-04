var Schedule = require('./../models/Schedule');
var CronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var high = spawn('python', ['./../pumpStart.py']);
var low = spawn('python', ['./../pumpStop.py']);
var scheduleInfo;
var week = [
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
var dayCount = 1;

function start(id, interval) {
  Schedule.forge({id: id})
  .fetch()
    .then(function(arduino) {
      if (arduino.attributes.auto === false) {
        high.stdout.on('data', function(data) {
          console.log('stdout: ' + data);
        });

        high.stderr.on('data', function(data) {
          console.log('stderr: ' + data);
        });
        setTimeout(stop, interval * 10000);
      } else {
        stop();
      }
    }).catch(function(error) {
      res.json(error);
      stop();
    });
};

function stop() {
  console.log('stopped');
  low.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });

  low.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
};

function timer(id, interval) {
  Schedule.forge({id: id})
  .fetch()
    .then(function(pi) {
      if (pi.attributes.auto === true) {
        console.log('Set to auto');
      } else {
        week.forEach(function(day) {
          if (pi.attributes[day] === true) {
            var job = new CronJob('00 30 10 * * ' + dayCount, function() {
              start(id, interval);
            }, function() {
                console.log(day + 'Job Canceled');
              },
            true, 'America/Los_Angeles');
            dayCount ++;
          }
        });
      }
    }).catch(function(error) {
      console.log('Scheduling Err ' + error);
    });
};

function arduinos() {
  Schedule.forge()
  .fetchAll()
    .then(function(arduinos) {
      arduinos.forEach(function(arduino) {
        timer(arduino.attributes.id, arduino.attributes.interval);
      });
    }).catch(function(error) {
      console.log('Err with fetching Ids');
    });
}

arduinos();

app.get('/schedules', function(req, res) {
  Schedule.forge()
  .fetchAll()
    .then(function(pis) {
      res.json(pis);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/schedules/:id', function(req, res) {
  Schedule.forge({id: req.params.id})
  .fetch()
    .then(function(pi) {
      res.json(pi);
    }).catch(function(error) {
      res.json(error);
    });
});

apiRouter.route('/schedules/:id')
.put(function(req, res) {
  new Schedule({id: req.body[0].pi_id, pi_id: req.body[0].pi_id})
    .save({
      auto: req.body[0].auto,
      humidity: req.body[0].humidity,
      interval: req.body[0].interval,
      monday: req.body[0].monday,
      tuesday: req.body[0].tuesday,
      wednesday: req.body[0].wednesday,
      thursday: req.body[0].thursday,
      friday: req.body[0].friday,
      saturday: req.body[0].saturday,
      sunday: req.body[0].sunday
    },
      {method: 'update'})
    .then(function(data) {
      timer(req.body[0].pi_id, req.body[0].interval);
    });
});

app.use('/server', apiRouter);
