var Schedule = require('./../models/Schedule');
var CronJob = require('cron').CronJob;
var spawn = require('child_process').spawn;
var high = spawn('python', ['./../pumpStart.py']);
var low = spawn('python', ['./../pumpStop.py']);
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
    .then(function(arduino) {
      if (arduino.attributes.auto === true) {
        console.log('Set to auto');
      } else {
        week.forEach(function(day) {
          if (arduino.attributes[day] === true) {
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
    .then(function(arduinos) {
      res.json(arduinos);
    }).catch(function(error) {
      res.json(error);
    });
});

app.get('/schedules/:id', function(req, res) {
  Schedule.forge({id: req.params.id})
  .fetch()
    .then(function(arduino) {
      res.json(arduino);
    }).catch(function(error) {
      res.json(error);
    });
});

apiRouter.route('/schedules/:id')
.put(function(req, res) {
  var scheduleData = req.body[0];
  new Schedule({id: scheduleData.pi_id, pi_id: scheduleData.pi_id})
    .save({
      auto: scheduleData.auto,
      humidity: scheduleData.humidity,
      interval: scheduleData.interval,
      monday: scheduleData.monday,
      tuesday: scheduleData.tuesday,
      wednesday: scheduleData.wednesday,
      thursday: scheduleData.thursday,
      friday: scheduleData.friday,
      saturday: scheduleData.saturday,
      sunday: scheduleData.sunday
    },
      {method: 'update'}
    ).then(function() {
      timer(scheduleData.pi_id, scheduleData.interval);
    });
});

apiRouter.route('/schedules/:id')
.post(function(req, res) {
  var scheduleData = req.body[0];
  new Schedule({id: scheduleData.pi_id, pi_id: scheduleData.pi_id})
    .save({
      auto: scheduleData.auto,
      humidity: scheduleData.humidity,
      interval: scheduleData.interval,
      monday: scheduleData.monday,
      tuesday: scheduleData.tuesday,
      wednesday: scheduleData.wednesday,
      thursday: scheduleData.thursday,
      friday: scheduleData.friday,
      saturday: scheduleData.saturday,
      sunday: scheduleData.sunday
    }).then(function() {
      timer(scheduleData.pi_id, scheduleData.interval);
    });
});

app.use('/server', apiRouter);
