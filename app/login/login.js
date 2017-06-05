'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', '$location', '$log', 'Users', function($scope, $rootScope, Auth, $location, $log, Users) {
        $scope.user={};
        $scope.auth = Auth; //acquires authentication from app.js (if it was done)

        //this function will be called when the "Login" button will be pressed
        $scope.signIn = function() {
            //initialize variables
            $scope.firebaseUser = null;
            $scope.error = null;
            //set the variable that is used in the main template to show the active button
            $rootScope.dati.currentView = "home";
            $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function(firebaseUser) {
                var userId = firebaseUser.uid;
                Users.registerLogin(userId, $scope.user.email);

                $location.path("/home");
            }).catch(function(error) {
                $scope.error = error;
                $log.error(error.message);
            });
        };
    }]);