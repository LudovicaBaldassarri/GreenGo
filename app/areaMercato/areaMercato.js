'use strict';

angular.module('myApp.areaMercato', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaMercato', {
            templateUrl: 'areaMercato/areaMercato.html',
            controller: 'areaMercatoCtrl'
        });
    }])

    .controller('areaMercatoCtrl', [function() {

    }]);