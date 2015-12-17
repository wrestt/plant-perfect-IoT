(function() {
  angular
  .module('plantApp')
  .factory('PiData', ['$http', '$location', '$window',
    function($http, $location, $window) {
    var PiData = {};
    PiData.light = [];
    PiData.soil = [];
    PiData.air = [];
    PiData.water = [];
  }]);
})();
