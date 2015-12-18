(function() {
  angular
    .module('plantApp')
    .controller('MainController', ['$scope', 'PiData',
      function($scope, PiData) {
        var vm = this;

        vm.buttonFetchPis = function() {
          console.log('pressed');
          PiData.fetchPis();
        };

      }
    ]);
})();
