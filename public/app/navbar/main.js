(function() {
  angular
    .module('plantApp')
    .controller('MainController', ['$scope', 'PiData', '$location',
      function($scope, PiData, $location) {
        var vm = this;

        // VARIABLES
        vm.pis = PiData.pis;
        vm.lightSets = PiData.light;
        vm.soilSets = PiData.soil;
        vm.airSets = PiData.air;
        vm.scheduleSet = PiData.schedule;
        vm.background = {"background":'url(/images/bg.png)'}

        // FUNCTIONS
        vm.fetchPis = fetchPis;
        vm.plantPage = plantPage;

        function fetchPis() {
          console.log('called fetch pis');
          PiData.fetchPis();
        };

        function plantPage(data) {
          $location.url('plants/' + data.id)
        };

      },
    ]);
})();
