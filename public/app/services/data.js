(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.pis = [];
    PiData.piId = [];
    PiData.air = [];
    PiData.soilRaw = [];
    PiData.light = [];
    PiData.schedule = [];
    PiData.name = [];
    PiData.soilLabels = [];
    PiData.soilSeries = [];
    PiData.lightLabels = [];
    PiData.lightSeries = [[],[],[]]
    PiData.airLabels = [];
    PiData.airSeries = [[],[]]

    PiData.fetchPis = function() {
      $http({
        method: 'GET',
        url: '/pis',
      }).then(function successCallback(data) {
        PiData.pis.push(data.data.data);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.fetchPi = function(id) {
      PiData.piId.push(id);
      $http({
        method: 'GET',
        url: '/pis/' + id,
      }).then(function successCallback(response) {
        var body = response.data;
        PiData.name.push(body.data.name);
        body.data.Air.forEach(function(air) {
          var dateData = new Date(air.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).split(' ').join('-');
          PiData.airLabels.unshift(dateData)
          PiData.airSeries[0].unshift(air.temp)
          PiData.airSeries[1].unshift(air.humidity)
        })
        body.data.Light.forEach(function(light) {
          var dateData = new Date(light.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).split(' ').join('-');
          PiData.lightLabels.unshift(dateData)
          PiData.lightSeries[0].unshift(light.lux)
          PiData.lightSeries[1].unshift(light.ir)
          PiData.lightSeries[2].unshift(light.visible)
        })
        body.data.Soil.forEach(function(soil) {
          var dateData = new Date(soil.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).split(' ').join('-');
          PiData.soilLabels.unshift(dateData)
          PiData.soilSeries.unshift(soil.humidity)
        })
        PiData.soilLabels.length = 20;
        PiData.soilSeries.length = 20;
        PiData.lightLabels.length = 20;
        PiData.lightSeries[0].length = 20;
        PiData.lightSeries[1].length = 20;
        PiData.lightSeries[2].length = 20;
        if (PiData.airLabels.length > 20) {
          PiData.airLabels.length = 20;
          PiData.airSeries[0].length = 20;
          PiData.airSeries[1].length = 20;
        }
        console.log(PiData.lightSeries)
        console.log(PiData.lightLabels);
        PiData.soilRaw.unshift(body.data.Soil);
        PiData.air.unshift(body.data.Air);
        PiData.light.push(body.data.Light);
        scheduleJob(body.data.Schedule);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    function scheduleJob(obj) {
      if (obj.length < 1) {
        PiData.postSchedule();
      } else {
        PiData.schedule.push(obj);
      }
    };

    PiData.postSchedule = function() {
      $http({
        method: 'POST',
        dataType: 'JSONP',
        url: '/server/schedules' + PiData.piId[0],
        data: {pi_id: PiData.piId[0], auto: false},
      }).then(function successCallback(response) {
        console.log(response);
        console.log('made it here');
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.putSchedule = function(obj) {
        $http({
          method: 'PUT',
          dataType: 'JSONP',
          url: '/server/schedules/' + PiData.piId[0],
          data: obj,
        }).then(function successCallback(response) {
          console.log(response);
        }, function errCallback(response) {
          console.log('Error while fetching Pis');
        });
      };

    PiData.pumpControl = function(data) {
      $http({
        method: 'POST',
        dataType: 'JSONP',
        url: '/server/schedules/' + PiData.piId[0] + '/pump',
        data: {status: data},
      }).then(function successCallback(response) {
        console.log(response);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    }

    return PiData;
  },]);
})();
