'use strict';

angular.module('myApp.otherUserProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/otherUserProfile/:otherUserId', {
            templateUrl: 'otherUserProfile/otherUserProfile.html',
            controller: 'otherUserProfileCtrl',
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
    .controller('otherUserProfileCtrl', ['$scope', '$rootScope', '$routeParams', 'Post', 'currentAuth', 'UsersFollowService',
        function ($scope, $rootScope, $routeParams, Post,currentAuth, UsersFollowService) {
            $scope.dati = {};
            $rootScope.dati= {};
            $rootScope.dati.currentView = "otherUserProfile";
            $scope.dati.posts = Post.getData();

            $scope.dati.userId = UsersFollowService.getUserInfo(currentAuth.uid);
            $scope.dati.otherUserId = $routeParams.otherUserId;
            $scope.dati.otherUserInfo = UsersFollowService.getUserInfo($scope.dati.otherUserId);

        }
    ]);
