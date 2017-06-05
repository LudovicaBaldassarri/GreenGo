'use strict';

angular.module('myApp.areaTutorial', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaTutorial', {
            templateUrl: 'areaTutorial/areaTutorial.html',
            controller: 'areaTutorialCtrl'
        });
    }])

    .controller('areaTutorialCtrl', [function() {

    }]);