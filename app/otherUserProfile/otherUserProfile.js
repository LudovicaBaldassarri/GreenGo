'use strict';

angular.module('myApp.OtheUserProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/otherUserProfile/:otherUserId', {
            templateUrl: 'otheUserProfile/otheUserProfile.html',
            controller: 'OtheUserProfileCtrl',
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
    .controller('OtherUserProfileCtrl', ['$scope', '$rootScope', '$routeParams',
        function ($scope, $rootScope, SinglePost, $routeParams) {
            $scope.dati = {};
            $rootScope.dati= {};
            $rootScope.dati.currentView = "otherUserProfile";
        }
    ]);
