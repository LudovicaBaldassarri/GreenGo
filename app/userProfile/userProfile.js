'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/userProfile', {
    templateUrl: 'userProfile/userProfile.html',
    controller: 'userProfileCtrl'
  });
}])

.controller('userProfileCtrl', [function() {

}]);