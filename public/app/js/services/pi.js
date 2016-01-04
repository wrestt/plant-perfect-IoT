(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.pis = [];
    PiData.piId = [];
    PiData.air = [];
    PiData.soil = [];
    PiData.light = [];
    PiData.schedule = [];

    PiData.fetchPis = function() {
      $http({
        method: 'GET',
        url: '/pis'
      }).then(function successCallback(data) {
        PiData.pis.push(data.data.data);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.fetchPi = function(data) {
      PiData.piId.push(data.id);
      $http({
        method: 'GET',
        url: '/pis/' + data.id
      }).then(function successCallback(response) {
        var body = response.data;
        PiData.light.push(body.data[0].Light);
        PiData.soil.push(body.data[0].Soil);
        PiData.air.push(body.data[0].Air);
        Pidata.schedule(body.data[0].Schedule);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.schedule = function(obj) {
      if (obj.length() < 1) {
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
        data: {pi_id: PiData.piId[0], auto: false}
      }).then(function successCallback(response) {
        console.log(response);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.putSchedule = function(obj) {
        $http({
          method: 'PUT',
          dataType: 'JSONP',
          url: '/server/schedules/' + PiData.piId[0],
          data: obj
        }).then(function successCallback(response) {
          console.log(response);
        }, function errCallback(response) {
          console.log('Error while fetching Pis');
        });
      };

    return PiData;
  }]);
})();
