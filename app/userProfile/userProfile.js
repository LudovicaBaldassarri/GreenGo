'use strict';

angular.module('myApp.userProfile', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/userProfile', {
            templateUrl: 'userProfile/userProfile.html',
            controller: 'userProfileCtrl',
            resolve: {
                // controller will not be loaded until $requireSignIn resolves
                // Auth refers to our $firebaseAuth wrapper in the factory below
                "currentAuth": ["Auth", function(Auth) {
                    // $requireSignIn returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $routeChangeError (see above)
                    return Auth.$requireSignIn();
                }]

            }
        })
    }])

    .controller('userProfileCtrl', ['$scope','$rootScope', 'Post','currentAuth','$firebaseAuth',
        function($scope,$rootScope, currentAuth, $firebaseAuth, Post) {
        $scope.dati={};
        $rootScope.dati={};
        $rootScope.dati.currentView = "userProfile";

        $scope.dati.posts = Post.getData();

    // $scope.logout = function () {
    //
    //     //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
    //     Users.registerLogout(currentAuth.uid);
    //     //sign out
    //     $firebaseAuth().$signOut();
    //     $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
    //         if (firebaseUser) {
    //             console.log("User is yet signed in as:", firebaseUser.uid);
    //         } else {
    //             $location.path("/login");
    //         }
    //     });
    //
    //
    // };
}]);