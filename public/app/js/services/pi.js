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
        PiData.light.push(body.data[0]['Light']);
        PiData.soil.push(body.data[0]['Soil']);
        PiData.air.push(body.data[0]['Air']);
        console.log(PiData);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    PiData.postAutomation = function(data) {
      $http({
        method: 'POST',
        url: '/schedules/' + PiData.piId[0],
        data: data
      }).then(function successCallback(response) {
        console.log('success', + data);
      }).then(function errCallback(response) {
        console.log('Error while posting schedule');
      });
    };

    return PiData;
  }]);
})();
