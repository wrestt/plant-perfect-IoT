(function() {
  angular
    .module('plantApp', ['ngRoute', 'ngResource', 'ngAnimate', 'ui.bootstrap', 'chart.js'])
    .config(['$resourceProvider', '$routeProvider', '$locationProvider',
      function($resourceProvider, $routeProvider, $locationProvider) {
        $routeProvider
          .when('/', {
            templateUrl: '/app/home/home.html',
            controller: 'MainController',
            controllerAs: 'vm',
          }).
          when('/plants/:id', {
            templateUrl: '/app/plant/plants.html',
            controller: 'PlantController',
            controllerAs: 'vm',
          }).
          otherwise({
            redirectTo: '/',
          });
      },
  ]);
})();
