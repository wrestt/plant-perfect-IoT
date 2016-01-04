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
        console.log(body);
        PiData.light.push(body.data[0].Light);
        PiData.soil.push(body.data[0].Soil);
        PiData.air.push(body.data[0].Air);
        PiData.schedule.push(body.data[0].Schedule);
        console.log(PiData);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.postAutomation = function(obj) {
        $http({
          method: 'POST',
          dataType: 'JSONP',
          url: '/server/schedules/' + PiData.piId[0],
          data: obj
        }).then(function successCallback(response) {
          if (response.data) {
            console.log(response);
          } else {
            console.log('FAILED TO POST DATA');
          }
        });
      };

    return PiData;
  }]);
})();
