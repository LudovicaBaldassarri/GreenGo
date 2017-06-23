'use strict';

angular.module('myApp.paginaProduttore', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/paginaProduttore', {
            templateUrl: 'paginaProduttore/paginaProduttore.html',
            controller: 'paginaProduttoreCtrl'
        });
    }])

    .controller('paginaProduttoreCtrl', [ function() {

        }]);
