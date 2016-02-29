(function() {
  angular
    .module('plantApp')
    .directive('navbar', function() {
      return {
        restrict: 'E',
        replace: false,
        controller: 'MainController',
        controllerAs: 'vm',
        templateUrl: '/app/navbar/navbar.html',
      };
    });
})();
