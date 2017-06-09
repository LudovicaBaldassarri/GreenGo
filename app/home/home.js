'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl',
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

    .controller('homeCtrl',['$scope','$rootScope','$firebaseAuth', 'Post',
        function($scope, $rootScope, $firebaseAuth, Post) {
            Post.getData().$loaded.then(function(data) {
                $scope.dati={};
                $rootScope.dati={};
                $scope.dati.vm = this;
                $rootScope.dati.currentView = "home";
                $scope.dati.posts = Post.getData();
            });
        }]);