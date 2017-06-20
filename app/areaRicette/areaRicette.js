'use strict';

angular.module('myApp.areaRicette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaRicette', {
            templateUrl: 'areaRicette/areaRicette.html',
            controller: 'areaRicetteCtrl'
        });
    }])

    .controller('areaRicetteCtrl', ['$scope', '$rootScope','Post',
        function($scope, $rootScope, Post) {

        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView="areaRicette";
        $scope.dati.posts = Post.getData();


    }]);

