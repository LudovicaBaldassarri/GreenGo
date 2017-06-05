'use strict';

angular.module('myApp.home', ['ngRoute', 'myApp.post'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])
    .controller('homeCtrl',['$scope', 'Post',
        function($scope, Post) {
            Post.getData().then(function(data) {
                $scope.dati = {};
                $scope.dati.post = data;
            });
        }]);
