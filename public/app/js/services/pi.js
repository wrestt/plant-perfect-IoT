(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.pis = [];

    PiData.fetchPis = function() {
      $http({
        method: 'GET',
        url: '/pis'
      }).then(function successCallback(data) {
        console.log('pis Found')
        console.info(data.data.data);
        PiData.pis.push(data.data.data)
      }, function errCallback(response) {
        console.log('Error while fetching Pis');
      });
    };
    return PiData;
  }]);
})();
