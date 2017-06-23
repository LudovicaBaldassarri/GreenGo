'use strict';

angular.module('myApp.areaRicette', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaRicette', {
            templateUrl: 'areaRicette/areaRicette.html',
            controller: 'areaRicetteCtrl',
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

    .controller('areaRicetteCtrl', ['$scope', '$rootScope','Post',
        function($scope, $rootScope, Post) {

        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView="areaRicette";
        $scope.dati.posts = Post.getData();


    }]);

