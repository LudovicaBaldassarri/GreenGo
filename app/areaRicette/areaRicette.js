'use strict';

angular.module('myApp.areaRicette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaRicette', {
            templateUrl: 'areaRicette/areaRicette.html',
            controller: 'areaRicetteCtrl'
        });
    }])

    .controller('areaRicetteCtrl', ['$scope', '$rootScope','Post', '$firebaseAuth',
        function($scope, $rootScope, Post , $firebaseAuth) {

        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView="areaRicette";
        $scope.dati.posts = Post.getData();


    }]);

