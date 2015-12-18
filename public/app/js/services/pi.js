(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.pis = [];
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
      $http({
        method: 'GET',
        url: '/pis/' + data.id
      }).then(function successCallback(response) {
        var body = response.data;
        console.log(body);
        PiData.light.push(body.data[0]['Light']);
        PiData.soil.push(body.data[0]['Soil']);
        PiData.air.push(body.data[0]['Air']);
        console.log(PiData.soil);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    return PiData;
  }]);
})();
