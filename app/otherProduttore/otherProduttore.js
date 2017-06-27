'use strict';

angular.module('myApp.otherProduttore', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/otherProduttore/:otherProduttoreId', {
            templateUrl: 'otherProduttore/otherProduttore.html',
            controller: 'otherProduttoreCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        });
    }])
    .controller('otherProduttoreCtrl', ['$scope', '$rootScope', '$routeParams','currentAuth', 'UsersFollowService', 'Prodotto',
        function ($scope, $rootScope, $routeParams, currentAuth,  UsersFollowService, Prodotto) {
            $scope.dati = {};
            $rootScope.dati= {};
            $rootScope.dati.currentView = "otherProduttore";

            $scope.dati.userId = UsersFollowService.getUserInfo(currentAuth.uid);
            $scope.dati.otherProduttoreId = $routeParams.otherProduttoreId;
            $scope.dati.otherProduttoreInfo = UsersFollowService.getUserInfo($scope.dati.otherProduttoreId);
            $scope.dati.products = Prodotto.getData();
        }
    ]);
