var morningRoutine = angular.module('app', ['ngRoute', 'ngTouch', 'ngAnimate']);

morningRoutine.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/day/:user/:thisDate', {
      templateUrl: 'partials/dayView/day.html',
      controller: 'dayCtrl'
    }).
    when('/stats/:user', {
      templateUrl: 'partials/statsView/stats.html',
      controller: 'statsCtrl'
    }).
    when('/login', {
      templateUrl: 'partials/loginView/login.html',
      controller: 'loginCtrl'
    }).
    otherwise({
      redirectTo: '/login'
    });
  }
]);
