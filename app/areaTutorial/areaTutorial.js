'use strict';

angular.module('myApp.areaTutorial', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/areaTutorial', {
            templateUrl: 'areaTutorial/areaTutorial.html',
            controller: 'areaTutorialCtrl',
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

    .controller('areaTutorialCtrl', ['$scope', '$rootScope', 'Post',
        function($scope, $rootScope, Post) {
            $scope.dati={};
            $rootScope.dati={};
            $rootScope.dati.currentView="areaTutorial";
            $scope.dati.posts = Post.getData();
        }]);