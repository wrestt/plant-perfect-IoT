(function() {
  angular
    .module('plantApp')
    .controller('MainController', ['$scope', 'PiData',
      function($scope, PiData) {
        var vm = this;
        vm.pis = PiData.pis;
        vm.lightSets = PiData.light;
        vm.soilSets = PiData.soil;
        vm.airSets = PiData.air;

        vm.fetchPis = function() {
          console.log('called fetch pis');
          PiData.fetchPis();
        };

        vm.fetchPi = function(data) {
          console.log(data);
          vm.pi = data;
          PiData.fetchPi(data);
        };

      }
    ]);
})();
