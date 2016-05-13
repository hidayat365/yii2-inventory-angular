'use strict';
// adjust to the your url of web service
var serviceBase = 'http://localhost/basic2/web/index.php/'
// declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.site',
  'myApp.item',
]);

// sub module declaration
var myApp_site = angular.module('myApp.site', ['ngRoute'])
var myApp_item = angular.module('myApp.item', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  // config default route
  $routeProvider.otherwise({redirectTo: '/site/index'});
}]);
