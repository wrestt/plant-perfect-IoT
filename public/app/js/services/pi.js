(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.light = {};
    PiData.soil = {};
    PiData.air = {};
    PiData.water = {};

    PiData.fetchPis = function() {
      $http({
        method: 'GET',
        url: '/pis'
      }).then(function successCallback(data) {
        console.info(data);
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };
    return PiData;
  }]);
})();
