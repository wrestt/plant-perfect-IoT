(function() {
  angular
    .module('plantApp', ['ngRoute', 'ngResource'])
    .config(['$resourceProvider', '$routeProvider', '$locationProvider',
      function($resourceProvider, $routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: '/app/partials/home.html',
            controller: 'MainController',
            controllerAs: 'vm'
          });
      }
  ]);
})();
