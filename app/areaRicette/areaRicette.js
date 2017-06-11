'use strict';

angular.module('myApp.areaRicette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaRicette', {
            templateUrl: 'areaRicette/areaRicette.html',
            controller: 'areaRicetteCtrl'
        });
    }])

    .controller('areaRicetteCtrl', ['$scope', '$rootScope', 'Ricetta', '$firebaseAuth',
        function($scope, $rootScope, Ricetta, $firebaseAuth) {
        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView="areaRicette";
        $scope.dati.ricettas= Ricetta.getData();

    }]);

