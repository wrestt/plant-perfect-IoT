(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.pis = [];
    PiData.air = [];
    PiData.soil = [];
    PiData.ligh = [];

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
      }).then(function successCallback(data) {
        PiData.soil.push(data.data.data[0]['Light']);
        PiData.soil.push(data.data.data[0]['Soil']);
        PiData.air.push(data.data.data[0]['Air']);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };

    return PiData;
  }]);
})();
